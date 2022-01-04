## Elastic Stack telepítése, tesztelése

Az **Elastic Stack alapvetően** négy szolgáltatásból áll, melyeek naplófájlok <br> beérkeztetésére és menedzselésére használhatóak.
<br> 
A négy **open-source** eszköz:
 - Elasticsearch
 - Kibana
 - Logstash
 - Beats

### Előkészületek, függőségek telepítése
Szükséges: 
- Linux-alapú rendszer (esetünkben Ubuntu)
- Terminálhozzáférés
- Felhasználó sudo vagy root jogokkal
- Java 8 vagy 10
#### 1. Java
Az Elastic Stack Java alapú így szükséges a Java 8 telepítése:

```console
sudo apt install openjdk-8-jdk
```

Ellenőrzés:
```console
java -version
```

#### 2. Nginx telepítése
Az Nginx web- és proxyszerverként működik.<br> Jelszó-alapú hozzáférést fog biztosítani a Kibana webes felülethez. (Reverse proxy)

```console
sudo apt install nginx
```
#### 3. Elastic repository hozzáadása
Elérhetővé kell tennünk az összes, a Stack-et alkotó alkalmazást,<br> hogy csomagkezelővel egyszerűen tudjuk őket telepíteni.
```console
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee –a /etc/apt/sources.list.d/elastic-7.x.list
```
### Komponensek telepítése
#### 1. Elasticsearch
A Stack szívének telepítése előtt frissíteni kell a repokat.
```console
sudo apt update
sudo apt install elasticsearch
```
**Konfigurálás:**
```console
sudo nano /etc/elasticsearch/elasticsearch.yml
```
A mi esetünkben nem szükséges speciális konfiguráció (még).<br><br>
**Indítás:**
```console
sudo systemctl start elasticsearch.service
```
**Rendszerindításkor induljon:**
```console
sudo systemctl enable elasticsearch.service
```
**Tesztelés:**
```console
curl -X GET "localhost:9200"
```
**Válasz:**
```json
{
  "name" : "UNI-Server02",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "MqXDWDieRfKm9Wqnu2Xwpg",
  "version" : {
    "number" : "7.16.1",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "5b38441b16b1ebb16a27c107a4c3865776e20c53",
    "build_date" : "2021-12-11T00:29:38.865893768Z",
    "build_snapshot" : false,
    "lucene_version" : "8.10.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```
#### 2. Kibana
Webes interfész telepítése, amivel lehetővé válik a logok lekérdezése, menedzselése, analízálása.<br><br>
**Telepítés:**
```console
sudo apt install kibana
```
**Konfigurálás:**
```console
sudo nano /etc/kibana/kibana.yml
```
Mivel az Nginx reverse proxyként fog szolgálni, így itt is megfelel az alapkonfiguráció.<br><br>
**Indítás:**
```console
sudo systemctl start kibana
sudo systemctl enable kibana
```
Tesztelhető a böngészőnkből: http://localhost:5601 
#### 3. Logstash
Különböző forrásokból érkező logok processtálására, szűrésére, továbbítására használjuk.<br><br>
**Telepítés:**
```console
sudo apt install logstash
sudo systemctl start logstash
sudo systemctl enable logstash
```
Teljesen testreszabhatóak az input, filter, output pipeline-ok, ezek konfigurációi `/etc/logstash/conf.d/` helyen tárolandóak.<br>
Alap pipeline (Beats --> Logstash --> Elasticsearch):
```properties
input {
  beats {
    port => 5044
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    manage_template => false
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
    document_type => "%{[@metadata][type]}"
```
#### 4. Filebeat
A Filebeat egy lightweight plugin logfájlok gyűjtésére és szállítására.<br> Különlegessége, hogy tud lassítani a tempón, ha Logstash megtelt adattal (megoldás -> Logstash load-balancing).<br>
További Beats modulok pl. Auditbeat, Heartbeat, Metricbeat.<br><br>
**Telepítés:**
```console
sudo apt install filebeat
```
**Konfigurálás:**
A Filebeat alapértelmezetten egyből az Elasticsearch-nek továbbít, mi szeretnénk ha az adatainkon még a Logstash dolgozna.
```console
sudo nano /etc/filebeat/filebeat.yml
```
Az *Elasticsearch output* szekcióban az alábbi sorokat kell kommentbe helyezni:
```yml
# output.elasticsearch:
   # Array of hosts to connect to.
   # hosts: ["localhost:9200"]
   ```
A *Logstash output* szekcióban lévő sorokban meg kell szüntetni a hash jelet:
```yml
output.logstash
     hosts: ["localhost:5044"]
 ```
 **Indítás:**
 A `system` beépített modul engedélyezése a filebeat-ben lehetővé teszi a helyi syslog vizsgálatát.
 ```console
 sudo filebeat modules enable system
```
**Index template betöltése:**
A logokat különböző indexek szerint rendezi a rendszer (keresés gyorsítása). <br>
A parancs által kapcsolódik a rendszerünk a Kibana felülethez, és az index előállítás és végbemegy.
```console
sudo filebeat setup -e \
  -E output.logstash.enabled=false \
  -E output.elasticsearch.hosts=['localhost:9200'] \
  -E setup.kibana.host=localhost:5601

sudo systemctl start filebeat
sudo systemctl enable filebeat
```
Ellenőrizzük, hogy az Elasticsearch kap-e adatot:
```console
curl -XGET http://localhost:9200/_cat/indices?v
```

### További lépések
A Stack minden eleme feltelepült. Következő lépésként a Kibana felületén hozzunk létre egy index pattern-t,<br> amely alapján tudjuk gyűjteni az indexeinket.<br>
Innentől a logfájljaink elérhetőek, akár a Discover menün keresztül.

#### Nginx reverse proxy
A biztonság növelése érdekében a legegyszerűbb módot alkalmazzuk:<br> Egy proxyt teszünk a Kibana elé, amely egy alap felhasználói autentikációt kér.
```console
sudo systemctl enable nginx
sudo nano /etc/nginx/sites-available/kibana
```
```properties
server {
    listen 80;
    server_name <server-IP-hostname>;

    location / {
        proxy_pass http://localhost:5601;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;        
    }
}
```
A <server-IP-hostname> helyére a fizikai interfészünk címe (vagy hostneve) kerüljön.<br>
**Konfiguráció tesztelése:**
  ```console
  sudo nginx -t
  ```
  Kibana site engedélyezése és a default config lecserélése:
  ```console
  sudo ln -s /etc/nginx/sites-available/kibana /etc/nginx/sites-enabled/
  sudo unlink /etc/nginx/sites-enabled/default
  systemctl restart nginx
```
  Most már a böngészőnkből a Kibana-t a 80-as porton érjük el (http://localhost).
  #### Alap autentikáció elérése
  ```console
  sudo apt install apache2-utils
```
  Ez egy jelszó-fájl létrehozó utility, amely segíteni fog nekünk, hogy az Nginx a létrehozott fájlból hitelesíti a felhasználót.
  ```console
  sudo htpasswd -c /etc/nginx/.kibana user2
```
  Itt létrehoztunk egy új felhasználót, aki hozzá tud majd férni a Kibanahoz.<br>
  Adjuk hozzá a Kibana site konfigurációhoz az alábbi két sort:
  ```properties
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.kibana;
  ```
Az Nginx újraindítása utána az alap autentikáció is müködőképes lesz.
  
#### Alkalmazáslogok figyelése, kliensekről is
Az Nginx logokat egyszerűen monitorozhatjuk a filebeat `nginx` moduljának bekapcsolásával:
```console
  sudo filebeat modules enable nginx
  sudo systemctl restart filebeat
  ```
  További modulok listázáshoz:
  ```console
  sudo filebeat modules list
  ```
Ezek után az nginx naplófájlok (access, error) is meg fognak jelenni a webes felületen.<br>
Lépjük ki a localhost zónából és gyűjtsünk logokat külső szerverekről.<br>
Elegendő csak a Filebeat-et telepíteni (akkor ha logfájlok gyűjtésére van szükségünk, további lehetőségekért ld. Beats modulok).<br>
  
```console
  curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.16.1-amd64.deb
  sudo dpkg -i filebeat-7.16.1-amd64.deb
```
A csomag telepítése után csatlakoztatni kell a kliensgépet az Elastic Stack-hez. <br>
Ehhez szerkesztenünk kell a filebeat.yml fájlt.<br>
A szerver Logstash elérését kell megadni outputként és az Elasticsearch kimenetet kikommentezni.
  ```yml
  #output.elasticsearch:
  #hosts: ["localhost:9200"]
  ```
  
   ```yml
  output.logstash:
  hosts: ["elastic-host-ip:5044"]
  ```
Engedélyezzük a kívánt modulokat:
  ```console
  sudo filebeat modules enable system nginx
  ```
#### Filebeat metrics logging érdekesség
A Filebeat alapértelmezetten fél percenként küld egy különböző metrikákat tartalmazó fájlt.<br> Az a gond, hogy valamiért ezek a naplósorok bekerülnek valamiért a syslog-ba is, arról nem is szólva, hogy az Elasticsearch is ezen fájlokkal terhelődik és lényegi információt nem nyújtanak.<br>
A funkció kikapcsolására tett kísérlet nem járt sikerrel, a logolási periódus növelése sem,<br> az alábbi sorok beillesztése a filebeat.yml fájlokba (minden hoston) megoldotta a problémát:
 ```yml
 logging:
  level: info
  to_files: true
  to_syslog: false
 ```
 
 #### Syslog severity, facility kinyerése
 Fontos lehet a logok súlyossági szintjének megfelelő lekérdezéseket gyártani, ehhez valahogyan meg kéne tudnunk egyes logok milyen szintűek.
 A probléma az volt hogy a `syslog` fájlban nem szerepelt a priority mező amiből tudnánk meghatározni a facility és severity levelt.
 Ahhoz, hogy tudjunk priority-t generálni a `syslog` sorokhoz az `rsyslog`-ot kellett segítségül hívni.
 Mivel az alap template nem felel meg (a pri hiányában) ezért csinálnunk kell egyet ('rsyslog.conf'):
 ```properties
$template TraditionalFormatWithPRI,"%pri% %timegenerated% %HOSTNAME% %syslogtag%%msg:::drop-last-lf%\n"
$ActionFileDefaultTemplate TraditionalFormatWithPRI
 ```
Ezek után a `logstash` filter így alakul:
 ```properties
 filter {
  if [event][module] == "system" {
    grok {
      match => { "message" =>"%{POSINT:syslog_pri} %{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }

    }
    syslog_pri { }
    date {
      match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
    }
 
  }
```
 A `syslog_pri { }` filter plugin segít nekünk olvasható formában kinyerni a severity és facility levelt. Most már bekerülnek ezek a mezők is az Elasticsearch-be.

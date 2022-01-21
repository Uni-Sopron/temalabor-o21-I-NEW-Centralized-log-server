import React from 'react';
import { Container, Badge, Alert } from 'react-bootstrap';
import syslog from '../images/syslog.png'
const Dev = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">5.</Badge> Installáció, konfigurációk bemutatása
            </h2>
            <hr></hr>
            <h3>Elastic Stack telepítése, tesztelése</h3>
            <h5>Előkészületek, függőségek telepítése</h5>
            Amire szükségünk van:
            <ul>
                <li>Linux-alapú rendszer (esetünkben Ubuntu)</li>
                <li>Terminálhozzáférés</li>
                <li>Felhasználó sudo vagy root jogokkal</li>
                <li>Java 8 minimum</li>
            </ul>
            <h6>1. Java telepítése</h6>
            <p>Az Elastic Stack Java alapú, szükséges a Java 8 telepítése, az alábbi paranccsal:</p>
            <code>sudo apt install openjdk-8-jdk</code>
            <p className='mt-3'>Ellenőrzés:</p>
            <code>java -version</code>
            <h6 className='mt-3'>2. Nginx telepítése</h6>
            <p>Az Nginx-et legtöbbet webszerverként ismerhetik, mi a proxy modulját fogjuk használni
                és jelszó-alapú hozzáférést fog biztosítani a Kibana felülethez. (Reverse Proxy)</p>
                <code>sudo apt install nginx</code>
            <h6 className='mt-3'>3. Elastic repository hozzáadása</h6>
            <p>Elérhetővé kell tennünk az összes, a Stack-et alkotó szolgáltatást a csomagkezelőnk számára.</p>
            <code>wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -<br></br>
                sudo apt install apt-transport-https<br></br>
                echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee –a /etc/apt/sources.list.d/elastic-7.x.list</code>
            <h5 className='mt-3'>Komponensek telepítése</h5>
            <h6>1. Elasticsearch</h6>
            <p>Frissítsük a repokat, majd telepítsünk.</p>
            <code>sudo apt update<br></br>
                sudo apt install elasticsearch</code>
                <h6 className='mt-3'>Konfigurálás:</h6>
                <code>sudo nano /etc/elasticsearch/elasticsearch.yml</code>
                <p>Nem szükséges konfiguráció még.</p>
                <h6 className='mt-3'>Indítás, rebootkor induljon el:</h6>
                <code>
                sudo systemctl start elasticsearch.service<br></br>
                sudo systemctl enable elasticsearch.service
                </code>
                <h6 className='mt-3'>Teszteljük!</h6>
                <code>curl -X GET "localhost:9200"</code>
                <h6 className='mt-3'>Response</h6>
                <pre>
                    <code>
                        {`{
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
}`}
                    </code>
                </pre>
                <h6 className='mt-3'>2. Kibana</h6>
                <p>A webes interfész telepítése következik, amivel elérhetőek lesznek a logok, azok menedzselése, analízise.</p>
                <code>sudo apt install kibana</code>
                <h6 className='mt-3'>Konfigurációs út</h6>
                <code>sudo nano /etc/kibana/kibana.yml</code>
                <p>Ezt is hagyjuk még így.</p>
                <h6>Indítás</h6>
                <code>sudo systemctl start kibana<br></br>
                sudo systemctl enable kibana</code>
                <p>Ezek után már elérhető a böngészőnkből: http://localhost:5601</p>
                <h6>3. Logstash</h6>
                <code>sudo apt install logstash <br></br>
                sudo systemctl start logstash<br></br>
                sudo systemctl enable logstash</code>
               <p className='mt-3'> Csináljunk egy alap pipeline-t, amely az összes filebeat által küldött adatot továbbítja az elasticsearch-nek.
                Ehhez a <code>/etc/logstash/conf.d/</code> helyen létre kell hoznunk egy .conf fájlt, nevezzük el mondjuk  <code>beats.conf</code> -ként
                (<i>egyébként egy számunkra megfelelő minta konfiguráció megtalálható itt:<code>/etc/logstash/logstash-sample.conf</code>, ezt másolhatjuk a megfelelő helyre</i>).
                A fájl tartalma ez:</p>
                <pre>
                    <code>
                        {`input {
  beats {
    port => 5044
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    manage_template => false
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
    document_type => "%{[@metadata][type]}"`}
                    </code>
                </pre>
                <h6>4. Filebeat</h6>
                <p>A Filebeat egy lightweight plugin logfájlok gyűjtésére és szállítására.
                Különlegessége, hogy tud lassítani a tempón, ha Logstash megtelt adattal.
                További Beats modulok pl. Auditbeat, Heartbeat, Metricbeat. Telepítsük!</p>
                <code>sudo apt install filebeat</code>
                <p className='mt-3'><b>Konfigurálás</b>: A Filebeat alapértelmezetten egyből az Elasticsearch-nek továbbít, mi szeretnénk ha az adatainkon még a Logstash dolgozna.</p>
                <code>sudo nano /etc/filebeat/filebeat.yml</code><br></br>
                Az <i>Elasticsearch output</i> szekcióban az alábbi sorokat kell kommentbe helyezni:
                <pre className='mt-3'>
                    <code>
                        {`# output.elasticsearch:
   # Array of hosts to connect to.
   # hosts: ["localhost:9200"]`}
                    </code>
                </pre>
                <p>A <i>Logstash output</i> szekcióban lévő sorokban meg kell szüntetni a hash jelet:</p>
                <pre>
                    <code>
                        {`output.logstash
     hosts: ["localhost:5044"]`}
                    </code>
                </pre>
            <p>A konfiguráció elmentése után engedélyezzük a filebeat beépített modulját: <code>system</code>.
            Ez az ágens fogja vizsgálni a helyi syslog fájlt.</p>
            <code>sudo filebeat modules enable system</code>
            <p className='mt-3'><b>Index template betöltése</b>: A logokat különböző indexek szerint rendezi a rendszer.
            A parancs által kapcsolódik a rendszerünk a Kibana felülethez, és az index előállítás is végbemegy.</p>
            <code>sudo filebeat setup -e \<br></br>
            -E output.logstash.enabled=false \<br></br>
            -E output.elasticsearch.hosts=['localhost:9200'] \<br></br>
            -E setup.kibana.host=localhost:5601<br></br>
            <br></br>
            sudo systemctl start filebeat<br></br>
            sudo systemctl enable filebeat</code>
            <p className='mt-3'>Ellenőrizzük, hogy az Elasticsearch kap-e adatot az indexek listázásval!</p>
            <code>curl -XGET http://localhost:9200/_cat/indices?v</code>
            <h5 className='mt-3'>További lépések</h5>
            <p>A Stack minden eleme feltelepült. Következő lépésként a Kibana felületén hozzunk létre egy index pattern-t,
            amely alapján tudjuk gyűjteni az indexeinket.
            Innentől a logfájljaink elérhetőek, akár a Discover menün keresztül.</p>
            <h6>Nginx reverse proxy</h6>
            <p> A biztonság növelése érdekében a legegyszerűbb módot alkalmazzuk:
            Egy proxyt teszünk a Kibana elé, amely egy alap felhasználói autentikációt kér.</p>
            <code>
            sudo systemctl enable nginx <br></br>
            sudo nano /etc/nginx/sites-available/kibana
            </code>
            <pre>
                <code>
                    {`server {
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
}`}
                </code>
            </pre>
            <p>A {`<server-IP-hostname>`} helyére a fizikai interfészünk címe (vagy hostname) kerüljön.</p>
            <h6>Hibaellenőrzés:</h6>
            <code>sudo nginx -t</code>
            <h6 className='mt-3'>Kibana site engedélyezése és a default config lecserélése:</h6>
            <code>sudo ln -s /etc/nginx/sites-available/kibana /etc/nginx/sites-enabled/<br></br>
                sudo unlink /etc/nginx/sites-enabled/default<br></br>
                systemctl restart nginx</code>
                <p>Most már a böngészőnkből a Kibana-t a 80-as porton érjük el (http://localhost)</p>
                <h6>Alap autentikáció elérése</h6>
                <code>
                sudo apt install apache2-utils
                </code>
                <p>Ez egy jelszó-fájl létrehozó utility, amely segíteni fog nekünk,
                     hogy az Nginx a létrehozott fájlból hitelesíti a felhasználót.</p>
                <code>sudo htpasswd -c /etc/nginx/.kibana user2</code>
                <p>Itt létrehoztunk egy új felhasználót, aki hozzá tud majd férni a Kibanahoz.
                Adjuk hozzá a Kibana site konfigurációhoz az alábbi két sort:</p>
                <pre><code>
                    {`auth_basic "Restricted Access";
auth_basic_user_file /etc/nginx/.kibana;`}</code></pre>
            <p>Az Nginx logokat egyszerűen monitorozhatjuk a filebeat <code>nginx</code> moduljának bekapcsolásával:
            </p>
            <code>sudo filebeat modules enable nginx<br></br>
            sudo systemctl restart filebeat</code>
            <p>További modulok listázáshoz:</p>
            <code>sudo filebeat modules list</code>
            <h6 className='mt-3'>Kliensek figyelése</h6>
            <p>Ezek után az nginx naplófájlok (access, error) is meg fognak jelenni a webes felületen.</p>
            <p>Lépjük ki a localhost zónából és gyűjtsünk logokat külső szerverekről.
            Elegendő csak a Filebeat-et telepíteni (akkor ha logfájlok gyűjtésére van szükségünk,
            további lehetőségekért ld. <a href='https://www.elastic.co/beats/'>Beats modulok</a>).   </p>     

            <code> curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.16.1-amd64.deb<br></br>
  sudo dpkg -i filebeat-7.16.1-amd64.deb</code>

           <p>A csomag telepítése után csatlakoztatni kell a kliensgépet az Elastic Stack-hez.
            Ehhez szerkesztenünk kell a <code>filebeat.yml</code> fájlt.
            A szerver Logstash elérését kell megadni outputként és az Elasticsearch kimenetet kikommentezni.</p> 

            <pre>
                <code>
                    {`#output.elasticsearch:
#hosts: ["localhost:9200"]`}
                </code>
            </pre>
            <pre>
                <code>
                    {`output.logstash:
hosts: ["elastic-host-ip:5044"]`}
                </code>
            </pre>
            <p>
            Engedélyezzük a kívánt modulokat:
            </p>
            <code>
            sudo filebeat modules enable system nginx
            </code>
            <h6 className='mt-3'>Filebeat metrics logging érdekesség</h6>
            <p>A Filebeat alapértelmezetten fél percenként küld egy különböző metrikákat tartalmazó fájlt.
            Az a gond, hogy valamiért ezek a naplósorok bekerülnek valamiért a syslog-ba is, arról nem is szólva, hogy az Elasticsearch is ezen fájlokkal terhelődik és lényegi információt nem nyújtanak.
            A funkció kikapcsolására tett kísérlet nem járt sikerrel, a logolási periódus növelése sem,
            az alábbi sorok beillesztése a <code>filebeat.yml</code> fájlokba (minden hoston) megoldotta a problémát:</p>
            <pre>
                <code>
                    {`logging:
 level: info
 to_files: true
 to_syslog: false`}

           
                </code>
            </pre>
            <h6>Syslog severity, facility kinyerése</h6>
            <p>Fontos lehet a logok súlyossági szintjének megfelelő lekérdezéseket gyártani,
                ehhez valahogyan meg kéne tudnunk egyes logok milyen szintűek.
                A probléma az volt hogy a <code>syslog</code> fájlban nem szerepelt a priority mező amiből tudnánk meghatározni a facility és severity levelt. Ahhoz, hogy tudjunk priority-t generálni a <code>syslog</code> sorokhoz az <code>rsyslog</code>-ot kellett segítségül hívni.
                Mivel az alap template nem felel meg (a pri hiányában) ezért csinálnunk kell egyet (hely: <code>rsyslog.conf</code>):</p>
                <pre>
                    {`$template TraditionalFormatWithPRI,"%pri% %timegenerated% %HOSTNAME% %syslogtag%%msg:::drop-last-lf%\n"
$ActionFileDefaultTemplate TraditionalFormatWithPRI`}
                </pre>
                <p>A Logstash filter pedig így alakul:</p>
                <pre>
                    {`filter {
 if [event][module] == "system" {
   grok {
     match => { "message" =>"%{POSINT:syslog_pri} %{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }

   }
   syslog_pri { }
   date {
     match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
   }

 }`}
                </pre>
                <Alert>
                    <Alert.Heading as='h6'>{`syslog_pri { }`}</Alert.Heading>
                    A syslog_pri {`{ }`} filter plugin segít nekünk olvasható formában kinyerni a severity és facility levelt. Most már bekerülnek ezek a mezők is az Elasticsearch-be.
                </Alert>
                <img src={syslog} width="50%"></img>
                <h6>Webes access, error logok feldolgozása</h6>
                <p>Azt már látjuk, hogy ha specifikus adatokra van szükségünk, akkor szükséges a Logstash használata, hiszen alapértelmezésben a nyers logok kerülnek továbbításra. Szinte mindenhol igény mutatkozik Apache, Nginx logsorok feldolgozására. Fontos tehát ismernünk, hogy hogyan néz ki egy ilyen sor. Itt jön képbe a Grok Debugger eszköz, amely egyszerűbbé teszi a minták írását. El kell döntenünk, milyen mezőkre van szükségünk, majd a grok pattern-t mintalogokra illesztjük,
                 és megfigyeljük milyen adatot tudtunk exportálni. Általában access logokra elegendő a {`%{COMBINEDAPACHELOG}`} minta.</p>
                <p>A logstash filterben az alábbi elágazásokat írhatjuk:</p>
                <pre>
                    {`if [event][module] == "nginx" {
   if [fileset][name] == "access" {
     grok {
       match => { "message" => "%{COMBINEDAPACHELOG}"  }
       remove_field => [ "message" ]
     }
}
 if [event][module] == "apache" {
   if [fileset][name] == "access" {
     grok {
       match => { "message" => "%{COMBINEDAPACHELOG}"  }
       remove_field => [ "message" ]
     }
   }`}
                </pre>
                <p>Azonban az error logoknál, a lényegre: a log levelre vagyunk kíváncsiak, ehhez a minta például:</p>
                <pre>
                    {`else if [fileset][name] == "error" {
     grok {
       match => { "message" => ["%{DATA:time} \[%{DATA:log_level}\] %{NUMBER:pid}#%{NUMBER:tid}: (\*%{NUMBER:connection_id} )?%{GREEDYDATA:messageTmp}"] }
       remove_field => "message"
     }
 mutate {
       rename => {"messageTmp" => "message"}
     }
 }`}
                </pre>
                <h6>Hatékonyabb indexelés</h6>
                <p>Különválaszthatjuk a webes és a rendszerre vonatkozó logokat, olyan módon például, hogy a system logok kapnak egy plusz taget, megjelölve, hogy ők a rendszerlogok, és ugyanígy a webeseknél. Majd az output plugin-nál
                     ezeket a tag-ek alapján szét lehet választani indexekbe. Értelemszerűen külön-külön index pattern-t kell létrehozni.</p>
                     <pre>
                         {`...
mutate {
    add_tag => ["syslog"]
}
...`}
                     </pre>
                     <pre>
                         {`output {
 if "syslog" in [tags] {
     elasticsearch {
       hosts => ["localhost:9200"]
       index => "syslog-%{+YYYY.MM.dd}"
    }
 }`}
                     </pre>
                     <h6>Eldobás</h6>
                     <p>Tulajdonképpen ha az informális logokra nincsen szükségünk azokat eldobhatjuk így:</p>
                     <pre>
                         {`...
if [syslog_severity] == "informational" {
       drop { }
}
...`}
                     </pre>
                     <p>Így csak az igazán sürgős adatokat fogjuk látni.</p>
            <h3>EFK Stack</h3>
            <h5>FluentD telepítése, konfigurálása</h5>
            <p>Az Elasticsearch és a Kibana feltelepítése majd konfigurálása után rátérhetünk a <b>fluentd</b>-re.
            A fluentd stabil változatán a Treasure Data Inc. végzi a folyamatos karbantartást. A fluentd a Ruby nyelvben készült, de a teljesítményérzékeny részeket
            C nyelven írták meg. Előfordulhat viszont, hogy egy Ruby démon telepítése néhány felhasználónak gondot okoz, ezért a cég biztosítja a fluentd stabil terjesztését, a <b>td-agent</b>-et.        
            </p>
            <h5>FluentD telepítése és ellenőrzése</h5>
            <code>curl -fsSL https://toolbelt.treasuredata.com/sh/install-ubuntu-focal-td-agent4.sh | sh</code>
            <p>Telepítés után ellenőrizzük fut-e a szolgáltatás:
            <code>
                <br></br>sudo systemctl status td-agent
            </code>
            </p>
            <p>
                <b>Kimenet:</b>
            </p>
            <pre>{` 
            ● td-agent.service - td-agent: Fluentd based data collector for Treasure Data
            Loaded: loaded (/lib/systemd/system/td-agent.service; disabled; vendor preset: enabled)
            Active: active (running) since Thu 2021-10-07 15:12:27 PST; 6min ago
                Docs: https://docs.treasuredata.com/articles/td-agent
            Process: 53192 ExecStart = /opt/td-agent/embedded/bin/fluentd --log /var/log/td-agent/td-agent.log --daemon /var/run/td-agent/td-agent.pid (code = exited, statu
            Main PID: 53198 (fluentd)
            CGroup: /system.slice/td-agent.service
                    ├─53198 /opt/td-agent/embedded/bin/ruby /opt/td-agent/embedded/bin/fluentd --log /var/log/td-agent/td-agent.log --daemon /var/run/td-agent/td-agent
                    └─53203 /opt/td-agent/embedded/bin/ruby -Eascii-8bit:ascii-8bit /opt/td-agent/embedded/bin/fluentd --log /var/log/td-agent/td-agent.log --daemon /v

            Dec 07 15:12:27 ubuntu systemd[1]: Starting td-agent: Fluentd based data collector for Treasure Data...
            Dec 07 15:12:27 ubuntu systemd[1]: Started td-agent: Fluentd based data collector for Treasure Data.
            `}</pre>
            <p>
                Látjuk, hogy a Fluentd elindult és aktív. A telepítés után érdemes beállítanunk, hogy egy esetleges szerver újraindulás után is, automatikusan elinduljon a fluentd:
                <br>
                </br>
                <code>
                    sudo systemctl enable td-agent
                </code>
            </p>
            <h5>FluentD konfigurálása</h5>
            <p>
                A Fluentd konfigurálásához két fontos könyvtárra lesz szükségünk.<br></br>
                <code>/var/log/td-agent/td-agent.log</code>, valamint a <code>/etc/td-agent/td-agent.conf</code><br></br>
                Előbbi a fluentd naplóbejegyzéseit tárolja, utóbbi pedig a fluentd <b>konfigurációs</b> fájlja.
            </p>
            <p>
                Végezzük el a fluentd konfigurálását. A szoftver konfigurálása tagekkel történik. Három fő tagel tudunk dolgozni a konfigurációs fájlba, ezek a következők:
              
                        <pre>{`
                <source>
                    @type syslog
                    port 5140
                    tag rsyslog
                    bind 0.0.0.0
                </source>
                        `}</pre>
                        <p>
                            A source tagben tudjuk megjelölni a forrást. (Honnan érkezik az adat.) Ez lehet egy port, amin hallgatózunk, egy beat küldő alkalmazás (pl. <i>Filebeat</i>), vagy akár maga a fluentd is beolvashatja beépített <b>tail-in</b> pluginjának köszönhetően.
                            A mi esetünkben, viszont elsődlegesen a legfontosabb a <b>rendszerlogok</b> feldolgozása volt. Ezeket sokféleképp bevihettük volna forrásként. A mi konfigurációnkba - egy beépített plugin - a <b>syslog-in</b>-t használtuk, ami tulajdonképpen az előbb említett tail plugin egy módosított megfelelője az egyszerűség és rugalmasság kedvéért.
                            Jól látható, hogy itt még szerepel egy <b>tag</b> rész. Ennek az értéke bármi lehet, a későbbiekben lesz nagy jelentősége.
                        </p>
                   
                        <pre>{`      
                <filter rsyslog.*>
                    @type record_transformer
                    enable_ruby
                    <record>
                        hostname "#{Socket.gethostname}"
                        tag {tag_parts[0]}
                        facility {tag_parts[1]}
                        severity {tag_parts[2]}
                    </record>
                </filter>
                        `}</pre>
                        <p>
                            A filter tagben történhet a legtöbb dolog. Itt tudjuk a bejött adatot testreszabni. Beállíthatjuk többek között, hogy milyen adatokat szeretnénk ki parse-olni a fájlunkból. Ha több fajta logfájlunk van itt tudunk közöttünk 'összhangot' teremteni.
                            Itt jön szerepbe a feljebb említett <b>tag</b> is. Minden egyes forrásnak megadhatunk egy egyedi azonosítót. (taget). Nálunk ez az 'rsyslog' lett tetszőlegesen.
                            A filter tag ebben a konfigurációban tehát csak az rsyslog tag-el rendelkező logokra teljesül. Ha lenne egy másik konfigurációnk mondjuk <b>postgrelogs</b> taggel, arra külön filtert írhatunk.
                            Az adatok 'kinyeréséhez' több megoldás is rendelkezésre áll a filter részben. Ilyen például grok, vagy regexp patternok használata, amik segítségével hosszú formátumokat dolgozhatunk ki adatainknak.
                            A mi esetünkben, viszont a <b>record_transformer</b>-t használtuk. (A record_transformer is része a fluentd alap csomagjának.)
                            Egy standard templatevel rendelkező logfájl két legfontosabb része a facility és a severity. Fentebb ezeket láthatjuk, ahogy 'kivettük' a beérkezett logból és megadott fieldbe csomagoltuk. Ezek mellett eltároltuk a taget, és egy hostnamet.
                        </p>
                   
                        <pre>{`
                <match rsyslog.*.*>
                    @type elasticsearch
                    host localhost
                    port 9200
                    logstash_format true
                </match>   
                        `}</pre>
                        <p>
                            A match tagben adjuk meg, hogy milyen adatbázisnak, analitikai motornak szeretnénk továbbítani a feldolgozott adatainkat. Ehhez egy kimenő portot, és az alkalmazás nevét adjuk meg. Itt látható, hogy típusnak az elasticsearch-öt adtuk meg.
                            Ez az elasticsearch ugye ugyan ezen szerveren fut és a 9200-as porton hallgatózik.
                            A <b>logstash_format</b> egy olyan attribútum, ami a logstash-hez hasonló formátumra alakítja a logfájlunkat. Ez az elasticsearchnél igen jól jöhet, mivel így biztosan kompatibilis lesz a logfájlunk az elastic stack-el.
                            A logstash_format helyett természetesen használhatnánk json formatot is például (mondjuk ha MongoDB-vel dolgoznánk). Az egész attól is függ, milyen szoftvernek küldjük tovább az adatainkat.
                        </p>
                  
            </p>
            <p>Ugyan nem használtuk (csak teszteléskor), de a három main tag mellett létezik két fontos sub tag is a fluentd-hez.</p>
           
                <pre>{`
        <parse>
            @type regexp
            # ...
        </parse> 
                 `}</pre>
                 <p>Ilyen a <b>parse</b> tag, amit a source és a filter tagben is használhatunk. Ilyen tagek közé kell írnunk a különböző formázó utasításainkat, ha pl. <i>regexp, grok</i> vagy más féle pattern-t használunk.</p>
               
                <pre>{`
        <buffer>
            @type file
        </buffer>
                 `}</pre>
                 <p>Ilyen még a <b>buffer</b> tag, amit tesztelésnél pl. használatba vettem. A match tagben helyezhetjük el subtag-ként, ha a kimeneti szolgáltatás támogatja a pufferelést. Tökéletes különböző időzítések létrehozásához.</p>
                
            <p>
                Természetesen még megannyi plugin tartozik a fluentd-hez, de úgygondolom a fontosakat összeszedtük.
            </p>
            <h5>Az rsyslog konfigurálása</h5>
            <p>Az <b>rsyslog</b> nyílt forráskódú szoftver-segédprogram, amit az UNIX számítógépes rendszerek használnak naplóüzenetek továbbításához az IP hálózaton.</p>
            <p>Az általunk készített EFK stack-ben is az rsyslogot használtuk, hogy továbbítsa a logokat a fluentd-nek.</p>
            <p>Az rsyslog.conf fájl első sorába kell beírnunk a következő sort:</p>
            <code>*.* @127.0.0.1:5140</code>
            <p>Innentől a rendszer minden naplófájlt az <b>5140</b>-es portra fog küldeni. Fentebb a fluentd-nél ezt a portot adtuk meg forrásként, így már tesztelhetjük is a rendszert a Kibana-ban.</p>
            <p>
                Az rsyslog config fájlban még lehetőségünk van egyedi log template-t készíteni. Az alapértelmezett formátum:
                <p>
                    <code>$ActionFileDefaultTemplate TraditionalFileFormat</code>
                </p>
                <p>
                    Ezt kitudjuk bővíteni plusz elemekkel, vagy esetleg JSON objektummá formálni. Például:
                    <pre>{`
            $ActionFileDefaultTemplate outfmt

            template(name="outfmt" type="list" option.jsonf="on") {
                property(outname="@timestamp" name="timereported" dateFormat="rfc3339" format="jsonf")
                property(outname="host" name="hostname" format="jsonf")
                property(outname="severity" name="syslogseverity" caseConversion="upper" format="jsonf" datatype="number")
                property(outname="facility" name="syslogfacility" format="jsonf" datatype="number")
                property(outname="syslog-tag" name="syslogtag" format="jsonf")
                property(outname="source" name="app-name" format="jsonf" onEmpty="null")
                property(outname="message" name="msg" format="jsonf")

            }  
                    `}</pre>
                    <br></br>
                    <p>Kimenet: </p>
                    <pre>{`{"@timestamp":"2018-03-01T01:00:00+00:00", "host":"172.20.245.8", "severity":7, "facility":20, "syslog-tag":"tag", "source":"tag", "message":" msgnum:00000000:"}`}</pre>
                    <p>
                        Ilyenkor értelemszerűen a fluentd-ben a <b>filter</b> tagben, már ehhez a formátumú bemenethez kell igazodnunk. Ezek a template-ek jól jöhetnek a rendszer későbbi <b>továbbfejlesztéséhez</b>.
                    </p>
                </p>
            </p>
            <h3>Graylog</h3>
            <p>...</p>
        </Container>
    )
}
export default Dev
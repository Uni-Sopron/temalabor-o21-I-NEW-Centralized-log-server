import React from 'react';
import { Container, Badge } from 'react-bootstrap';

const Dev = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">5.</Badge> Fejlesztői bemutatás
            </h2>
            <hr></hr>
            <h3>Elastic Stack telepítése, tesztelése</h3>
            <p>...</p>
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
                <ul>
                    <li>
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
                            A mi esetünkben, viszont elsődlegesen a legfontosabb a <b>rendszerlogok</b> feldolgozása volt. Ezeket sokféleképp bevihettük volna forrásként. A mi konfigurációnkba - egy beépített plugin - a <b>syslog-in</b>-t használtam, ami tulajdonképpen az előbb említett tail plugin egy módosított megfelelője az egyszerűség és rugalmasság kedvéért.
                            Jól látható, hogy itt még szerepel egy <b>tag</b> rész. Ennek az értéke bármi lehet, a későbbiekben lesz nagy jelentősége.
                        </p>
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                </ul>
            </p>
            <p>Ugyan nem használtuk (csak teszteléskor), de a három main tag mellett létezik két fontos sub tag is a fluentd-hez.</p>
            <ul>
                <li>
                <pre>{`
        <parse>
            @type regexp
            # ...
        </parse> 
                 `}</pre>
                 <p>Ilyen a <b>parse</b> tag, amit a source és a filter tagben is használhatunk. Ilyen tagek közé kell írnunk a különböző formázó utasításainkat, ha pl. <i>regexp, grok</i> vagy más féle pattern-t használunk.</p>
                </li>
                <li>
                <pre>{`
        <buffer>
            @type file
        </buffer>
                 `}</pre>
                 <p>Ilyen még a <b>buffer</b> tag, amit tesztelésnél pl. használatba vettem. A match tagben helyezhetjük el subtag-ként, ha a kimeneti szolgáltatás támogatja a pufferelést. Tökéletes különböző időzítések létrehozásához.</p>
                </li>
            </ul>
            <p>
                Természetesen még megannyi plugin tartozik a fluentd-hez, de úgygondolom a fontosakat összeszedtük.
            </p>
            <h3>Graylog</h3>
            <p>...</p>
        </Container>
    )
}
export default Dev
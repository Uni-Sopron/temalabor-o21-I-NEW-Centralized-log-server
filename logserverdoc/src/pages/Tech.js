import React from 'react';
import { Container, Badge, Table, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import elk from '../images/elk.svg'
import elkflow from '../images/elkflow.png'
import graylog from '../images/graylog_tools.png'
import filebeat from '../images/filebeat.png'
const Tech = () => {
    const fluentd_conf = "<match logtype.error>type...</match>"

    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">3.</Badge> Technológia
            </h2>
            <hr></hr>
            <p className='mt-2'>
                <h3>
                    Közösen használt technológiák
                </h3>
                <p>A közösen használt eszközök közé azok tartoznak, melyeket a cyan Security biztosított a számunkra, vagy valamilyen segédeszközök voltak.</p>
                <ListGroup className='mb-3'>
                    <ListGroupItem>
                        <b>Ubuntu 20.04</b>
                        <p>Debian-alapú Linux disztribúció, melynek a szerver változatát használtuk értelemszerűen.
                        Több alternatíva is előkerült, de kezdésként, és az erős közösségi támogatottsága miatt erre esett a választás.</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <b>Proxmox VE</b>
                        <p>Nyílt virtualizációs környezet, QEMU/KVM és LXC alapján, melyben a virtuális szervereink készültek.</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <b>VPN (FortiClient)</b>
                        <p>Ahhoz, hogy el tudjuk érni a céges erőforrásokat, egy VPN tunnel-re volt szükségünk.
                        Ezáltal elérhetővé váltak a belső IP címek, így a virtuális gépek is</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <b>PuTTY</b>
                        <p>Egy elterjedt SSH kliens grafikus felülettel, megszokásból használtuk ennél a feladatnál is ezt.
                        Igaz, nem volt kötelező, használhattuk volna a Windows-os parancssorunkat is, de 3 SSH kapcsolatnál érdemes menedzselni ezeket.</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <b>Midnight Commander</b>
                        <p>A Total Commander terminálos megfelelője. Segítségével egyszerűbbé vált az elérési útak böngészése.</p>
                    </ListGroupItem>
                </ListGroup>
                <h3>Mi miből áll?</h3>
                <Alert variant='info'>
                    <Alert.Heading as="h5">
                        Info
                    </Alert.Heading>
                    Az adatbegyűjtésre használt komponensek közül több alternatíva is kompatibilis lehet az adott rendszerrel, ez mindhárom esetben igaz
                    (<i>például az EFK Stack esetében az rsyslogot csak kísérleti nyúlként alkalmaztuk, egyébként a beépített tail plugint szokták használni</i>).
                    
                </Alert>
                 <Table striped bordered hover style={{ marginTop:20}}>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Elastic Stack</th>
                        <th>EFK Stack</th>
                        <th>Graylog</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Adatgyűjtő rész</b></td>
                            <td>Beats<br>
                            </br><i>Alternatíva: Elastic Agents, számtalan megoldás</i>
                            </td>
                            <td>rsyslog<br></br>
                            <i>Alternatíva: tail plugin, syslog plugin, Beats</i>
                            </td>
                            <td>Beats, TCP, UDP protokoll<br>
                            </br>
                            </td>
                        </tr>

                        <tr>
                            <td><b>Processzálás, szűrés</b></td>
                            <td>Logstash</td>
                            <td>Fluentd</td>
                            <td>Graylog kezeli, Logstash opcionális</td>
                        </tr>

                       
                        <tr>
                            <td><b>Adatbázis</b></td>
                            <td colspan="2">Elasticsearch</td>
                            <td>Elasticsearch, MongoDB a konfigurációs adatok tárolására</td>
                        </tr>

                        <tr>
                            <td><b>Webes felület</b></td>
                            <td colspan="2">Kibana</td>
                            <td>Graylog sajátja</td>
                        </tr>

                    </tbody>
                    </Table>
                    
            
                <h3>
                    <a href='https://www.elastic.co/'>Elastic Stack (ELK) </a>
                </h3>
                <hr></hr>
                <p>
                    Az <b>ELK</b> egy betűsző, 3 nyílt-forráskódú projektet takar: <b>Elasticsearch</b>, <b>Logstash</b> és <b>Kibana. </b>
                    Mondhatni ez a piacvezető rendszer naplófájlok gyűjtésére és elemezésére.
                </p>
                <img src={elkflow} style={{float:'right'}} width="60%"></img>
                <img src={elk} width="40%" className='mb-3'></img>
                
                <h4>Elasticsearch</h4>
                <p>Az Elasticsearch egy ingyenes, nyílt analítikai motor mindenféle adattípusra,
                    akár legyen az strukturált vagy nem-strukturált. Az <b>Apache Lucene</b> alapján készült (Java alapú), és 2010-ben jelent meg.
                    Ismert az egyszerű REST API-járól, skálázhatóságáról és gyorsaságáról, ez a komponens az Elastic Stack szíve és lelke, amely Stack
                    egy olyan eszközgyűjtemény, melyben szerepet kap az adatok beérkeztetése, tárolása, analízálása és vizualizálása.
                    Még gyakran hivatkoznak rá ELK Stack-ként, azonban már a <b>Beats</b> projektet is hozzácsatolták az eddigiekhez, a név Elastic lett és már erőforrásbarát "adatszállítókat" kaptunk.
                </p>
                <h6>Mire használatos?</h6>
                Az Elasticsearch tulajdonságait kihasználva számtalan esetben használható:
                <ul>
                    <li>
                        Logging és log elemzés
                    </li>
                    <li>
                        Infrastruktúra metrikák és konténerizációs megoldások monitorozása
                    </li>
                    <li>
                        Performancia monitoring
                    </li>
                    <li>
                        Biztonsági analítika
                    </li>
                    <li>
                        Üzleti elemzések
                    </li>
                </ul>
                <h6>Hogyan működik?</h6>
                <p>Az Elasticsearch különböző helyekről képes fogadni nyers adatokat: naplók, metrikák, webes alkalmazások...
                Az adat "lenyelés" (data ingestion) olyan folyamat, mely által a nyers adat parszolva, normalizálva lesz mielőtt még indexelve lenne az adatbázisban.
                Miután az adatok index minták (index pattern) alapján tárolásra kerülnek komplex, aggregált lekérdezéseket is tudunk használni.
                Ehhez az adatbázishoz akár többféleképpen is hozzáférhetünk, ha fejlesztésről lenne szó (köszhetően az egyszerű REST API-nak):
                <ul>
                    <li>SQL</li>
                    <li>Python</li>
                    <li>Java</li>
                    <li>JavaScript (Node.js)</li>
                    <li>Go</li>
                    <li>.NET (C#)</li>
                    <li>PHP</li>
                    <li>Perl</li>
                    <li>Ruby</li>
                </ul>
                </p>
                <h6>Miért használjuk?</h6>
                <p><b>Gyorsaság</b>: Közel real-time platform, a dokumentumok indexeléstől számítva igen gyorsan vállik kereshetővé (1 másodperc tipikusan).
                    Jól használható időérzékény scenarioknál, mint infrastruktúra monitorozás vagy biztonsági analízis.
                </p>
                <p><b>Az Elasticsearch elosztott</b>: A dokumentumok elosztott tárolókban (shards) laknak. A shard-ok redundáns tárolást tesznek lehetővé,
                ami jól jön hardveres hibánál. Az Elasticsearch akár 100 (akár 1000) szerverre skálázható, és akár képessé téve petabyte-nyi adatok kezelését.
                </p>
                <p><b>Sok feature</b>: Index lifecycle management például. A régebbi indexek archiválhatóak, naponta készíthető új index.
                </p>
                <p><b>A Data ingest és reporting könnyű </b>: Grafikus eszközök sokasága jellemzi a rendszert.
                </p>
                <Alert variant='info'>
                    <Alert.Heading as= "h6">Elastic indexek</Alert.Heading>
                    Az Elastic indexek olyan dokumentumok gyűjteménye, amelyek egymással kapcsolatban vannak. Az Elasticsearch JSON dokumentumokban tárol.
                </Alert>
                <h4>Logstash</h4>
                <p> A Logstash szintén az ELK Stack magját képzi, ám használata nem kötelező. Az a funkciója, hogy preprocesszálja az adatokat, mielőtt még az Elasticsearch adatbázisba kerülnének.
                Ez a köztes rész, mint egy pipeline teszi lehetővé a többféle forrásból szimultán áramló adatok transzformálva legyenek.
                Igen gazdag pluginkészlettel rendelkezik, különféle szűrők írhatóak benne, elágazásokkal, inputokkal és outputokkal.</p>
                <h6>Példa pipeline, Apache access logokra</h6>
                <div className='mb-3'>
                <pre>
                    <code>
                    {`input {
    beats {
        port => "5044"
    }
}
filter {
    if [fileset][name] == "access" {
        grok {
            match => { "message" => "%{COMBINEDAPACHELOG}"}
        }
    }
}
output {
    elasticsearch {
        hosts => [ "localhost:9200" ]
    }
}  `}
                    </code>
                </pre>
              
        
                </div>
                <p>Ennél a példánál az <code>input</code> plugin Beats adatokat fog fogadni az 5044-es porton,
                    apache-access logokra szűrünk. A <code>grok</code> egy mintára illeszti a sorokat, bizonyos mezőkhöz rendeli a sor részeit, majd ezeken további módosítások hajthatóak végre.
                    Az <code>output</code> plugin az átdolgozott adatot az elasticsearchnek fogja küldeni.
                </p>
                <h4 className='mt-3'>Kibana</h4>
                <p>A Kibana pedig az adatok vizualizálásáért és menedzseléséért felel. Valós-idejű hisztogramok, vonaldiagrammok, pie chart-ok és térképek készíthetőek többek közt benne.
                Fontos eszközök, amik említésre méltóak és elérhetőek a Kibana felületen: Grok Debugger (A Logstash szűrők írása miatt érdemes használni), Console (REST API használata), Alerts (behatolások detektálása) stb.
                Lényegében ez a rendszer frontend-je.</p>
                <h4>Beats (Filebeat)</h4>
               
                <p> Erőforrásbarát adatszállítók, figyelik és gyűjtik a logokat, majd továbbítják a kívánt célhoz. 
                Képes arra, hogy hogy leállás után megjegyezze a helyet, hol tartott, majd folytatja az olvasást és küldést.
                Beépített modulokat használ az adatok gyűjtésére és parszolására (csak ismertebb naplók), ez lényegesen leegyszerűsíti a konfigurálást.
                Több Beats alternatíva létezik: Filebeat (legelterjedtebb), Metricbeat, Heartbeat, Auditbeat, Functionbeat és egyebek.
                Ezt a részt lehetne nevezni a "kliensoldalnak".
                Mi a Filebeat forkot használtuk a félévben, a többit csak kipróbáltuk. Beats működése:</p>
                <img src={filebeat} width="70%"></img>
                <h3>
                    EFK Stack
                </h3>
                <hr></hr>
                <p>
                    <h4>Fluentd</h4>
                    <h6>E(F)K?</h6>
                    Az EFK Stack, az ELK-hoz hasonló központosított loggyűjtő és megjelenítő megoldás. A három open-source program (elasticsearch, logstash, kibana) közül ugyanis
                    itt kimarad a logstash, helyét a <b>fluentd</b> váltja fel.
                    <h6 className='mt-3'>Mi az a fluentd?</h6>
                    
                    A fluentd is, akárcsak a logstash egy nyílt forráskódú adatgyűjtő szoftver. Megkönnyíti az összegyüjtött adatok értelmezését és elemzését. Leggyakrabban központi loggyűjtő megoldásokhoz használják, ahogy mi is tettük.
                    A fluentd és a logstash közötti különbségeket alább egy táblázatban gyűjtöttük ki. A legfontosabb különbség a teljesítmény. A fluentd lényegesebben kevesebb plugint használ az alap csomagban, mint a logstash. Inkább a teljesítmény növelésére lett kifejlesztve.
                    Ugyanakkor a konfigurációja pont emiatt kicsit összetettebb lehet.
                    A fluentd feladata leválasztani a különböző rendszerek naplófájlait és így egy egységes naplózási réteget biztosít. A rétegnek köszönhetően a fejlesztők, adatelemzők nyugodtan generálatnak
                    sokféle logtípust. A szerveren a háttérben futhat, közben folyamatosan gyűjti, elemzi, átalakítja az adatokat. Ezen tulajdonságainak köszönhetően a rendszer segíti a naplóadatok gyors feldolgozását és csökkenti a szervezet félretájékoztatásának kockázatát.
                    A technológia elterjedése az úgynevezett konténeres környezeteknek is köszönhető, hiszen ott is egyszerű konfigurálni.
                    <Table striped bordered hover style={{ marginTop:20}}>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Logstash</th>
                        <th>Fluentd</th>
                        <th>Megjegyzés</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Fejlesztő</b></td>
                            <td>A Logstash a híres ELK stack része.</td>
                            <td>A Fluentd-t a Treasure Data hozta létre.</td>
                            <td>Ennek ellenére a Fluentd is kiváló támogatást kap az Elastichoz. Támogatása miatt a konténeres technológiákhoz jobb választás, mint a Logstash.</td>
                        </tr>

                        <tr>
                            <td><b>Programnyelv</b></td>
                            <td>JRuby, szükséges Java runtime.</td>
                            <td>CRuby, nincs szükség a Javara.</td>
                            <td>A Fluentd előnye, hogy nem használja a Javat.</td>
                        </tr>

                       
                        <tr>
                            <td><b>Eseménykezelés</b></td>
                            <td>If, else kondíciók pl. <code>if[loglevel] == 'ERROR'</code></td>
                            <td>Tageket használ az eseménykezelésre. <code>{fluentd_conf}</code></td>
                            <td>A Fluentd előnye, hogy tageket használva egyszerűbb a rengeteg típusú log feldolgozására. A Logstashnél kicsit körülményesebb.</td>
                        </tr>

                        <tr>
                            <td><b>Plugin támogatás</b></td>
                            <td>Megközelítőleg 200db.</td>
                            <td>Megközelítőleg 500db.</td>
                            <td>A Logstash az összes pluginját központosítva tárolja a github repoban. A Fluentd nem rendelkezik repoval a pluginokhoz.</td>
                        </tr>

                        <tr>
                            <td><b>Teljesítmény</b></td>
                            <td>Több memóriát használ.</td>
                            <td>Kevesebb memóriát használ.</td>
                            <td>A Fluentd így jobb teljesítményt biztosít, de igazából teljesítményben mindkét megoldás kézenfekvő.</td>
                        </tr>

                        <tr>
                            <td><b>Szállítás</b></td>
                            <td>A Logstash egy memórián belüli sorra korlátozódik, amely 20 eseményt tartalmaz.</td>
                            <td>Fluentd egy alaposan konfigurálható Buffer-system-el rendelkezik.</td>
                            <td>Egy 2015-ös Openstack felmérés szerint mindkét megoldás hasonló és kézenfekvő.</td>
                        </tr>
                        
                        <tr>
                            <td><b>Támogatás</b></td>
                            <td>Igen <a href="https://www.elastic.co/guide/en/logstash/current/index.html" target="_blank">Link</a>.</td>
                            <td>Igen <a href="https://docs.fluentd.org/" target="_blank">Link</a>.</td>
                            <td>A Logstash az Elastic részeként jobb támogatással rendelkezik.</td>
                        </tr>

                    </tbody>
                    </Table>
                </p>
                
                    <h3>Graylog</h3>
                     <p>  
                        A Graylog egy opensoucre platform, amely leegyszerűsítí a strukturált és a strukturálatlan adatrekordok kezelését.



                        Egy központosított naplókezelési megoldás, amely nyitott szabványok szerint készült a naplófájlok terabájtjainak rögzítésére, tárolására és valós idejű elemzésére, lehetővé téve a real-time  keresést. A Graylog lehetővé teszi a méretezhető naplókezelési megoldások kiválasztását, hogy többet tudjon kezelni biztonsági és teljesítményadataival. Az adott vállalat méretétől, technológiáitól vagy konfigurációitól függetlenül a Graylog megfelelő lehetőséget kínál.

         <h5>Autentikáció</h5>

 <p>A Graylog hitelesítési hozzáférése az LDAP. Az LDAP segítségével szinkronizálhatjuk az egyes csoportokat és a csoportokon belüli felhasználókat. Számos felhasználónevet létre lehet hozni a hálózaton, és szinkronizálni a Graylogon belüli csapatokkal. Így az Active Directory-csoportok szinkronizálódnak a Graylogon belüli szinkronizált csoportokkal, és továbbítják a felhasználókat. </p>

<h5>Graylog Sidecars</h5>

A Graylog Sidecar egy konfigurációkezelő rendszer különböző log gyűjtőkhöz, más néven Backendekhez. A Graylog főcsomópont központilag elhelyezett hubként működik, amely tartalmazza a naplógyűjtők konfigurációit. A naplógyűjtő konfigurációk központilag kezelhetők a Graylog webes felületén keresztül. <br></br>

<h5>Log Inputs</h5>

A Graylog beállítások adatok nélkül semmit sem érnek. A Graylog inputok felelősek a naplóüzenetek elfogadásáért. Néhány alapértelmezett üzenettípus alapértelmezés szerint elérhető a Graylogban. 


<h6><br></br>Log források: </h6>
<ul>
<li> <b> Ingest syslog  </b> </li>
<li>Ingest journald </li>
<li>Ingest Windows eventlog</li>
<li>Ingest CEF</li>
<li>Ingest Raw/Plaintext</li>
<li>Ingest GELF</li>
<li>Ingest from files</li>
<li>Ingest JSON path from HTTP API</li>
<li>Ingest Application Data</li>
</ul> 


EGYEDI BEMENETEK:<br></br>
<ul> 
<li> <b> Beats </b></li><b> </b>
<li>AWS Kinesis/CloudWatch bemenet</li>
<li>IPFIX bemenet</li>
<li> Okta napló eseménybevitel </li>
<li>Palo Alto Networks bemenet</li>

</ul>
A Beats nyílt forráskódú adatszállítók, amelyeket "ügynökként" telepít a szervereire, hogy  adatokat küldjön az Elasticsearch -nek . Az Elastic ütemeket biztosít a rögzítéshez:



<b>Filebeat </b>


A Filebeat egy szállító a naplóadatok továbbításához és központosításához. A kiszolgálókra "ügynökként" telepített Filebeat figyeli a megadott naplófájlokat vagy helyeket, összegyűjti a naplóeseményeket, és továbbítja azokat az Elasticsearch vagy a Logstash felé indexelés céljából.


                        Négy komponensből áll: </p> 
                        </p>
                       <ul>
                        <li>Elasticsearch 7.15.2</li>
                        <li>MongoDB 4.0.27</li>
                        <li>Filebeat 7.15.2</li>
                       <li>Graylog 4.2.1</li> </ul> 
                       

                        <img src={graylog} width="50%" height="50%" className='mb-3'></img>


<p><h5>MongoDB</h5>
A Graylog a MongoDB-t használja a konfigurációs adatok tárolására, nem pedig a naplóadatokat.
 A rendszer csak metaadatokat tárol, például felhasználói információkat vagy adatfolyam-konfigurációkat.
  A naplóüzenetek egyike sem kerül tárolásra a MongoDB-ben. Ez az oka annak, hogy a MongoDB-nek nincs nagy rendszerhatása,
   és nem kell túl sokat aggódni a méretezés miatt.
</p>






        </Container>
    )
}
export default Tech
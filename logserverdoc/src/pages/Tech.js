import React from 'react';
import { Container, Badge, Table, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import elk from '../images/elk.svg'
const Tech = () => {
    const fluentd_conf = "<match logtype.error>type...</match>"
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">3.</Badge> Technológia
            </h2>
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
                        <p>Egy elterjedt SSH kliens, megszokásból használtuk ennél a feladatnál is ezt.
                        Igaz, nem volt kötelező, használhattuk volna a Windows-os parancssorunkat is, de 3 SSH kapcsolatnál érdemes menedzselni ezeket.</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <b>Midnight Commander</b>
                        <p>A Total Commander terminálos megfelelője. Segítségével egyszerűbbé vált az elérési útak böngészése.</p>
                    </ListGroupItem>
                </ListGroup>
                
                <h3>
                    <a href='https://www.elastic.co/'>Elastic Stack (ELK) </a>
                </h3>
                <p>
                    Az <b>ELK</b> egy betűsző, 3 nyílt-forráskódú projektet takar: <b>Elasticsearch</b>, <b>Logstash</b> és <b>Kibana. </b>
                    Mondhatni ez a piacvezető rendszer naplófájlok gyűjtésére és elemezésére.
                </p>
                <img src={elk} width="40%" className='mb-3'></img>
                <h4>Elasticsearch</h4>
                <p>Az Elasticsearch egy ingyenes, nyílt analítikai motor mindenféle adattípusra,
                    akár legyen az strukturált vagy nem-strukturált. Az <b>Apache Lucene</b> alapján készült (Java alapú), és 2010-ben jelent meg.
                    Ismert az egyszerű REST API-jairól, skálázhatóságáról és gyorsaságáról, ez a komponens az Elastic Stack szíve és lelke, amely Stack
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
                </p>
                <Alert variant='info'>
                    <Alert.Heading as= "h6">Elastic indexek</Alert.Heading>
                    Az Elastic indexek olyan dokumentumok gyűjteménye, amelyek egymással kapcsolatban vannak. Az Elasticsearch JSON dokumentumokban tárol.
                </Alert>
                <h3>
                    EFK Stack
                </h3>
                <p>
                    <h4>Fluentd</h4>
                    <p><b>E(F)K?</b></p>
                    Az EFK Stack, az ELK-hoz hasonló központosított loggyűjtő és megjelenítő megoldás. A három open-source program (elasticsearch, logstash, kibana) közül ugyanis
                    itt kimarad a logstash, helyét a <b>fluentd</b> váltja fel.
                    <p style={{ marginTop: 10 }}><b>Mi az a fluentd?</b></p>
                    
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

                        Négy komponensből áll:</p>
                        </p>
                        <p>Elasticsearch 7.15.2</p>
                        <p>MongoDB 4.0.27</p>
                        <p>Filebeat 7.15.2</p>
                        <p>Graylog 4.2.1</p> 


        </Container>
    )
}
export default Tech
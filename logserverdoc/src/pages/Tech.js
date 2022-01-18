import React from 'react';
import { Container, Badge, Table } from 'react-bootstrap';

const Tech = () => {
    const fluentd_conf = "<match logtype.error>type...</match>"
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">3.</Badge> Technológia
            </h2>
            <p className='mt-2'>
                <h3>
                    EFK Stack
                </h3>
                <p>
                    Az EFK Stack, az ELK-hoz hasonló központosított loggyűjtő és megjelenítő megoldás. A három open-source program (elasticsearch, logstash, kibana) közül ugyanis
                    itt kimarad a logstash, helyét a <b>fluentd</b> váltja fel.
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
                <p>
                    <h3>Graylog</h3>
                     <p>  
                        A Graylog egy opensoucre platform, amely leegyszerűsítí a strukturált és a strukturálatlan adatrekordok kezelését.</p>

                        Négy komponensből áll:
                        <tr>
                        <td>Elasticsearch 7.15.2</td>
<td>MongoDB 4.0.27</td>
<td>Filebeat 7.15.2</td>
<td>Graylog 4.2.1 </td>

</tr>












                </p>
            </p>
        </Container>
    )
}
export default Tech
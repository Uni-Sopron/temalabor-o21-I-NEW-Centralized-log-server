import React from 'react';
import { Container, Badge, Table, ListGroup, ListGroupItem } from 'react-bootstrap';

const Summary = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">7.</Badge> Összegzés
            </h2>
            <hr></hr>
            <p className='mt-2'>
            A három rendszer között voltak átfedések és különbségek. Nehéz meghatározni egyértelműen, hogy "melyik a jobb." 
            Mindegyik rendszernek vannak erősebb és gyengébb tulajdonságai, mind remekül használható enterprise környezetben.
            Az alábbi táblázatban szempontok alapján próbáltuk szemléltetni az erősebb és gyengébb oldalakat. </p>
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
                            <td><b>Beépített funkciók</b></td>
                            <td>Előny: Nem szűkölködik beépített funkciókban.<br></br>Hátrány: Alapértelmezetten nincsen felhasználókezelés. Pluginból érhető el.</td>
                            <td>Az EFK Stack szintén tartalmazza a Kibana-t. Az Elastic jellemzők itt is érvényesek.</td>
                            <td>Előny: Rengeteg funkció, felhasználókezelés alapértelmezetten. <br>
                            </br>Nagyobb hátrány: nincs indexelés, pontosabban a Graylog ezt kezeli saját maga, ami azt jelenti, hogy egy helyen gyűlik minden adat.</td>
                        </tr>

                        <tr>
                            <td><b>Konfigurálhatóság</b></td>
                            <td>Előny: Jól dokumentált. <br></br> Hátrány: Sok finomhangolás szükséges, ha nem elégszünk meg az alaptermékekkel. A Logstash használata nehézkes lehet.</td>
                            <td>A Fluentd-vel flexibilis az eseménykezelés, szűrők írása, mint a Logstash által.</td>
                            <td>Előny: Itt viszonylag kevés konfigurációval egy egészen használható platformot kapunk.<br></br> Hátrány: Ha szükségünk van a Logstash-re, itt is érvényes az, mint az Elastic-nál.</td>
                        </tr>

                       
                        <tr>
                            <td><b>Kezelhetőség</b></td>
                            <td colSpan='2'>A Kibana felülete felhasználó- / rendszergazdabarát.</td>
                            <td>A Graylog felülete hasonló, de több időt igényel a megtanulása.</td>
                        </tr>

                        <tr>
                            <td><b>Plugin-ok</b></td>
                            <td>Az Elastic-hoz rengeteg plugin telepíthető, főleg a Logstash miatt.</td>
                            <td>Kevesebb plugin, de azokat jól, egyszerűen lehet használni.</td>
                            <td>Külön Graylog marketplace.</td>
                        </tr>

                        <tr>
                            <td><b>Teljesítmény</b></td>
                            <td>A Java sok memóriát igényel, azonban ez a keresési sebességen nem érezhető.
                                 (Meg kell jegyezni, hogy a tesztkörnyezetünk nem a valós életnek megfelelően volt méretezve.) </td>
                            <td>Jobb teljesítmény, a Fluentd nem használ Java-t, a Logstash igen.</td>
                            <td>Mint az Elastic.</td>
                        </tr>

                        <tr>
                            <td><b>Infrastrukturális jellemzők</b></td>
                            <td>Elosztott használat, shard-ok által replikálódik az adat. Multi-node lehetőség az Elasticsearchben, a Logstash load-balance képes.</td>
                            <td>Legtöbbször Kubernetes klaszteren használják. (Legoptimálisabb)</td>
                            <td>Leginkább single-server felhasználás, de lehetőség van multi-node haszálatra.</td>
                        </tr>
                        
                       
                        <tr>
                            <td><b>Dokumentáció</b></td>
                            <td colSpan='2'>Jól dokumentált</td>
                         
                            <td>Nehezen érthető dokumentáció</td>
                        </tr>
                    </tbody>
                    </Table>
            <p>A téma célja egyfajta elmélyülés volt a linux-alapú rendszerek, a naplózás és a centralizált log szerverek világában.
            Három elterjedt nyílt technológiával ismerkedtünk meg, és némi tapasztalatot szereztünk a rendszergazdai feladatok körében.
            Azt állapítottuk meg, hogy a vizsgált rendszerek igaz, hogy az Elastic attribútumokat veszik alapul, mégis különbözőek:
            Az Elastic Stack-nél a performancia a gyengepont, az EFK próbál ezen segíteni, a Graylog pedig kicsit olyan érzést kelt,
            mintha nem is nyílt rendszer lenne, az olyan döntések miatt, mint hogy nem teszi lehetővé az indexek kezelését.
            Az összehasonlító vizsgálatot valós scenarioknak megfelelően méretezett környezetekben érdemes folytatni, és úgy tűnik erre lesz lehetőség!
           </p>
           <p> A félév végén tartott konzultáción a cyan Security két lehetséges továbbhaladási irányt jelölt meg:</p>
            <ListGroup as="ol" numbered >
                <ListGroupItem as="li"><b>A rendszer kiépítésének optimalizálása</b>
                <div>A rendszerek alkalmazása viszonylag könnyű,
                     viszont a cég munkatársainak elmondása alapján egy elosztott rendszer kidolgozása az nehezebb feladat.
                     Itt figyelembe kell venni a hálózati infrastruktúrát is. </div>
                </ListGroupItem>
                <ListGroupItem as="li"><b>Big Data feldolgozás</b>
                <div>A cég DNS lekérdezési hatalamas adatforgalmat generálnak (petabyte nagyságrend). Ezen adatok várnak feldolgozásra a megismert rendszerek egyikével.
                    </div></ListGroupItem>
            </ListGroup>
        </Container>
    )
}
export default Summary
import React from 'react'
import { Container, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';

const Problem = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">2.</Badge> Probléma
            </h2>
            <p className='mt-2'>
                A <b>cyan Security Group</b> azt szeretné, hogy a hálózat sokféle eszközének rendszernaplóit, valamint az egyedi és nem egyedi szoftveres megoldásokat
                monitorozni (<b>valós időben, indexelve!</b>) tudjuk a magas rendelkezésre állás és gyors hibakezelések érdekében. Ehhez nem elég egy SSH kapcsolattal megkeresni az adott szolgáltatás elérési útját és hosszasan böngészni a naplókat.
                Erre nincsen idő egy vállalati környezetben.
                Sokszor a naplósorokat nem is lehet értelmezni (pl. többsoros, bonyolult), ezeket érdemes lenne úgy processzálni, hogy használhatóak legyenek.
                Egyszerre nézegetni a fájlokat is igen megterhelő lenne, hiszen előfordulhat, hogy több számunkra érdekes forrás is van, mint 4-5 darab, így kényelmesebb lenne egy GUI használata.
            </p>
            <p className='mt-2'>
                Ezek alapvetően rendszermérnöki problémák, melyekre léteznek nyílt forráskódú megoldások, így nem kell nekünk megírnunk a sajátunkat, hanem
                dolgozhatunk a jól bevált költséghatékony technológiákkal. 
            </p>
            <p className='mt-2'>
                A munka megkezdése előtt le kellett fektetni a követelményeket, melyek egyeznek a cég elvárásaival,
                a tapasztalatunkkal és a tárgy teljesítéséhez szükséges feltételekkel. Ezek a következők:
            </p>
            <h4>
                Követelmények
            </h4>
                <ListGroup as='ol' numbered className='mt-2'>
                    <ListGroupItem as='li'>
                        <b>Ismerkedés a Linux alapú operációs rendszerekkel (Ubuntu)</b>
                        <div>
                           alap parancsok, mappaszerkezet, szolgáltatások kezelése
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>A naplófájlok, naplózás mechanikájának tanulmányozása</b>
                        <div>
                            <code>/var/log/</code> mappa átnézése, syslog sorok
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Tech stack-ek megismerése</b>
                        <div>
                            feladatok elosztása, komponensek dokumentációjának olvasása
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Komponensek telepítése</b>
                        <div>
                            a tech stack-ek telepítése virtuális szerverre, konfigurálás
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Tesztelés</b>
                        <div>
                            loggyűjtés tesztelése localhoston, majd kliensekkel is
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Logok lekérdezése</b>
                       <div>
                       webes felület használata
                       </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Vizualizáció</b>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                       <b>Webes felület biztonságossá tétele</b>
                       <div>reverse proxy megoldása, beépített opciók</div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                       <b>Logok szűrése</b>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                       <b>Összehasonlítás</b>
                    </ListGroupItem>
                </ListGroup>
            
        </Container>
    )
}
export default Problem
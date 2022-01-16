import React from 'react'
import { Container, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import kep from "../images/mclog.png"
const Problem = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">2.</Badge> Probléma
            </h2>
            <p className='mt-2'>
                A <b>cyan Security Group</b> azt szeretné, hogy a hálózat sokféle eszközének rendszernaplóit, valamint az egyedi és nem egyedi szoftveres megoldásokat
                monitorozni (<b>akár valós időben, indexelve!</b>) tudjuk a magas rendelkezésre állás és gyors hibakezelések érdekében. Ehhez nem elég hosszasan böngészni a naplókat lokálisan.
                Erre nincsen idő egy vállalati környezetben.
                Sokszor a naplósorokat nem is lehet értelmezni (pl. többsoros, bonyolult), ezeket érdemes lenne úgy processzálni, hogy használhatóak legyenek.
                Egyszerre nézegetni a fájlokat is igen megterhelő lenne, hiszen előfordulhat, hogy több számunkra érdekes forrás is van, mint 4-5 darab, így kényelmesebb lenne egy GUI használata.
                Fontos szempont még, hogy az előforduló igazán kritikus hibákat könnyedén tudjuk detektálni, és kimutatások alapján megtenni a szükséges lépéseket.
            </p>
           <p>
           Egy példa a syslog fájlból <i>"hagyományos"</i> módszerrel:</p> 
           <div style={{background: "#0021", borderRadius: "3px", padding: "5px", boxShadow: "5px 10px 8px #888888"}}>
           <code>cyanadm@UNI-Server02:~$ sudo tail -f /var/log/syslog<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Listening on GnuPG cryptographic agent and passphrase cache.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Listening on debconf communication socket.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Listening on REST API socket for snapd user session agent.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Listening on D-Bus User Message Bus Socket.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Reached target Sockets.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Reached target Basic System.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Reached target Main User Target.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[1]: Started User Manager for UID 1000.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[61275]: Startup finished in 107ms.<br></br>
                30 Jan 16 14:30:01 UNI-Server02 systemd[1]: Started Session 178 of user cyanadm.</code><br></br>
               
           </div>
           <p className='mt-4'>Esetleg böngészgethetjük az auth.log fájlt így:</p>
           <img src={kep} width="100%" alt=''></img>
           <p className='mt-3'> Vagy ha hibák érdekelnek minket:</p>
           <div style={{background: "#0021", borderRadius: "3px", padding: "5px", boxShadow: "5px 10px 8px #888888"}}>
           <code> 
            cyanadm@UNI-Server02:~$ journalctl -p 3 <br></br>
            ...<br></br>
            Dec 17 17:28:58 UNI-Server02 systemd[1]: Failed to start Filebeat sends log files to Logstash or directly to Elasticsearch..<br></br>
            Dec 23 12:24:51 UNI-Server02 rsyslogd[3603454]: error: extra characters in config line ignored: '”{'<%'}PRI%{'>%'}TIMESTAMP% %HOSTNAME% %syslogtag%%msg%”' [v8.2001.0]
            <br></br> ... 
            </code>
            
           </div>
          
            <p className='mt-4'>
                Érezhetjük tehát, hogy élesben nem túl hatékony parancsokat használni, keresgélni az elérési útvonalakat.
                Ezek alapvetően rendszermérnöki problémák, melyekre léteznek nyílt forráskódú megoldások, így nem kell nekünk megírnunk a sajátunkat, hanem
                dolgozhatunk a jól bevált költséghatékony technológiákkal. 
            </p>
            <p className='mt-2'>
                A munka megkezdése előtt le kellett fektetni a követelményeket, melyek egyeznek a cég elvárásaival,
                a tapasztalatunkkal és a tárgy teljesítéséhez szükséges feltételekkel. Ezek a következők:
            </p>
            <h4>
                Funkcionális követelmények
            </h4>
                <ListGroup as='ol' numbered className='mb-3'>
                    <ListGroupItem as='li'>
                        <b>Linux-alap</b>
                        <div>
                            A cégcsoport szinte teljesen open-source szoftvereket használ, így nekünk is ezekkel kell dolgoznunk.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Index-alapú tárolás</b>
                        <div>
                            A modern konvencióknak megfelelően indexelve tároljunk.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Nyers logok processzálása</b>
                        <div>
                            Az adatok mezőkre bontva kerüljenek az adatbázisba.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Lekérdezések készítése</b>
                        <div>
                            Szűrések, fontos sorok kinyerése.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Statisztikák megjelenítése webes interfészen</b>
                        <div>
                            Elemzések készítése a telepített webes felület használatával.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Cégspecifikus rendszerek naplóinak feldolgozása</b>
            
                    </ListGroupItem>
                </ListGroup>
           <h4>Nemfunkcionális követelmények</h4>
           <ListGroup as="ol" numbered className='mt-2'>
           <ListGroupItem as='li'>
                        <b>Előnyök, hátrányok detektálása</b>
                        <div>
                            Az összehasonlítás érdekében több szempontot figyelembe kell venni a munkánk során:
                            <ul>
                                <li>
                                    Konfigurálhatóság
                                </li>
                                <li>
                                    Erőforrásigény
                                </li>
                                <li>
                                    Támogatás
                                </li>
                                <li>
                                    Kezelhetőség
                                </li>
                                <li>
                                    Funkciók
                                </li>
                                <li>
                                    Stabilitás
                                </li>
                                <li>
                                    Skálázhatóság
                                </li>
                            </ul>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>VPN és az adott virtuális környezet használata</b>
                        <div>
                            Hogy a produktum követhető legyen, a cég által biztosított virtuális gépeket használtuk, melyeket VPN kapcsolaton érhettünk el otthonról.
                        </div>
                    </ListGroupItem>
                    <ListGroupItem as='li'>
                        <b>Alapszintű biztonsági megoldás biztosítása</b>
                        <div>
                            Csak egy hitelesített felhasználó érje el a webes felületet.
                        </div>
                    </ListGroupItem>
           </ListGroup>
        </Container>
    )
}
export default Problem
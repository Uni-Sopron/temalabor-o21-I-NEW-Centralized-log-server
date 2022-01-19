import React from 'react'
import { Container, Badge, Alert, ListGroupItem, ListGroup } from 'react-bootstrap';

const Introduction = () => {
    return (
        <Container className="mt-5">
            <h2>
                <Badge bg="secondary">1.</Badge> Bevezető 
            </h2>
            <hr></hr>
            <p className="mt-2">
                Szinte mindegyik operációs rendszer, alkalmazás vagy hálózati eszköz generál naplófájlokat. Ezek a fájlok rögzítik az operációs rendszerben bekövetkezett eseményeket,
                szoftverfuttatásokat, vagy felhasználók közötti üzeneteket. A naplófájlokból rengeteg információt megtudhatunk, ezért is fontosak. Ki / Mi? Mikor? Hol? készítette, mennyire súlyos, vagy esetleg
                csak informatív jellegű. 
            </p>
            <p className='mt-2'>
                Képzeljük, csak el, hogy egy vállalati környezetben működő szerverek, azok szolgáltatásai, webes alkalmazások, asztali alkalmazások mennyi naplófájlt generálnak.
                Lehetetlenség külön minden forrásra figyelni, reagálni a hibákra.
                Jó lenne egy olyan megoldást találni, mellyel ezeket a logokat egy központi rendszerbe lehet gyűjteni, és emberi szem számára kellemes formában lekérdezhetőek, elemzések készíthetőek.
            </p>
           
            <p className="mt-2">
                A <a className='link-style' target="_blank" rel='noopener noreferrer' href="https://www.linkedin.com/company/cyansecurity/?originalSubdomain=hu"> cyan Security Group</a> cégcsoport open-source biztonsági megoldásokat kínál. Rendszerei különböző naplófájlokat generálnak, viszont jelenleg nincs központosított naplószerverük, illetve voltak próbálkozások, de nem volt egyértelmű, hogy melyik technológiai megoldás lenne a legoptimálisabb.
                A cél egy olyan környezet létrehozása, amely felel a naplófájlok közös gyűjtéséért, hogy azokat a jövőben gördülékenyen lehessen elemezni, mindezt <b>Linux (Ubuntu)</b> alapokon.
            </p>
            <p className="mt-2">
                A témával hárman foglalkoztunk (Rácz Máté, Mandl Ábel, Horváth Bálint) és mindhárman különböző modern és ingyenes technológiával dolgoztunk,
                ugyanakkor a megoldásainkban vannak közös pontok is. 
                A továbbiakban olvashatóak az eddigi tapasztalataink és megfigyeléseink. Ki fogunk téreni egyes rendszerek előnyeire és hátrányaira is.
               
            </p>
            <h3>A dokumentáció felosztása</h3>
            <ListGroup as="ol" numbered className='mb-3'>
                    <ListGroupItem as="li">
                        Probléma leírása
                    </ListGroupItem>
                    <ListGroupItem as="li">
                        Felhasznált technológiák listázása
                    </ListGroupItem>
                    <ListGroupItem as="li">
                        "Felhasználói" bemutatás
                    </ListGroupItem>
                    <ListGroupItem as="li">
                        Konfigurációk bemutatása
                    </ListGroupItem>
                    <ListGroupItem as="li">
                        Idővonal (Roadmap)
                    </ListGroupItem>
                    <ListGroupItem as="li">
                        Összegzés
                    </ListGroupItem>
                </ListGroup>
            <Alert variant='warning'>
                <Alert.Heading>Megjegyzés</Alert.Heading>
                Az eddig szerzett tudásunk Linux-alapú rendszerekről korlátozott, így a munka nagy részét a Linux-szal való ismerkedés tette ki, ezáltal több kérdés nyitva maradt a jövőre nézve.</Alert>
        </Container>
    )
}
export default Introduction
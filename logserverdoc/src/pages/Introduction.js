import React from 'react'
import { Container, Badge, ListGroup } from 'react-bootstrap';

const Introduction = () => {
    return (
        <Container className="mt-5">
            <h2>
                <Badge bg="secondary">1.</Badge> Bevezető 
            </h2>
            <p className="mt-2">
                Szinte mindegyik operációs rendszer, alkalmazás generál naplófájlokat. Ezek a fájlok rögzítik az operációs rendszerben bekövetkezett eseményeket,
                szoftverfuttatásokat, vagy felhasználók közötti üzeneteket. A naplófájlokból rengeteg információt megtudhatunk, ezért is fontosak. Ki / Mi? Mikor? Hol? készítette, mennyire súlyos, vagy esetleg
                csak informatív jellegű. 
            </p>
            <p className='mt-2'>
                Képzeljük, csak el, hogy egy vállalati környezetben működő szerverek, azok szolgáltatásai, webes alkalmazások, asztali alkalmazások mennyi naplófájlt generálnak.
                Lehetetlenség külön minden forrásra figyelni, reagálni a hibákra.
                Jó lenne egy olyan megoldást találni, mellyel ezeket a logokat egy központi rendszerbe lehet gyűjteni, és emberi szem számára kellemes formában lekérdezhetőek, elemzések készíthetőek.

            </p>
            <p className="mt-2">
                A feladatunk egy központosított naplószerver létrehozása volt a <a className='link-style' target="_blank" rel='noopener noreferrer' href="https://www.linkedin.com/company/cyansecurity/?originalSubdomain=hu">cyan Security Group</a> részére, mely vállalat open-source biztonsági megoldásokat kínál. A cég tesztelésképp 3 szervert és szerverenként 2-2 darab klienst biztosított nekünk <a className='link-style' target="_blank" rel='noopener noreferrer' href='https://ubuntu.com/'>Linux (Ubuntu)</a> operációs rendszerrel. A probléma megoldásához kizárólag
                nyílt szoftvereket használtunk.
            </p>
               
            <p className="mt-2">
                A cég rendszerei különböző naplófájlokat generálnak, viszont jelenleg nincs központosított naplószerverük, illetve voltak próbálkozások, de nem volt egyértelmű, hogy melyik technológiai megoldás lenne a legoptimálisabb.
                A cél egy olyan környezetlétrehozása, amely felel a naplófájlok közös gyűjtéséért, hogy azokat a jövőben gördülékenyen lehessen elemezni.
            </p>
            <p className="mt-2">
                A feladatot hárman csináltuk (Rácz Máté, Mandl Ábel, Horváth Bálint) és mindhárman különböző modern és ingyenes technológiával dolgoztunk.
                Ugyanakkor a megoldásainkban vannak közös pontok is. A továbbiakban mindhárom megoldás előnyeire és hátrányaira is kitérünk.
            </p>
        </Container>
    )
}
export default Introduction
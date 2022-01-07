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
            <p className="mt-2">
                A feladatunk egy központosított naplószerver létrehozása volt a <b>cyan Security Group</b> részére. A cég tesztelésképp 3 szervert és szerverenként 2-2db klienst biztosított nekünk Linux operációs rendszerrel. A probléma megoldásához kizárólag
                open source szoftvereket használtunk. A munka három fő fázisból állt melyek a következők:
            </p>
                <ListGroup className="mt-2">
                    <ListGroup.Item>A szoftverek telepítése.</ListGroup.Item>
                    <ListGroup.Item>A telepített szoftverek konfigurálása, testreszabása.</ListGroup.Item>
                    <ListGroup.Item>A rendszer tesztelése.</ListGroup.Item>
                </ListGroup>
            <p className="mt-2">
                A cég rendszerei különböző naplófájlokat generálnak, viszont jelenleg nincs központosított naplószerverük. A cél egy olyan környezet
                létrehozása, amely felel a naplófájlok közös gyűjtéséért, hogy azokat a jövőben gördülékenyen lehessen elemezni.
            </p>
            <p className="mt-2">
                A feladatot hárman csináltuk (Rácz Máté, Mandl Ábel, Horváth Bálint) és mindhárman különböző modern és ingyenes technológiával dolgoztunk.
                Ugyanakkor a megoldásainkban vannak közös pontok is. A továbbiakban mindhárom megoldás előnyeire és hátrányaira is kitérünk.
            </p>
        </Container>
    )
}
export default Introduction
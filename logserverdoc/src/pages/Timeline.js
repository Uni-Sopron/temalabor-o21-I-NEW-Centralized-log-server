import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {  FaRecordVinyl } from 'react-icons/fa';
const Timeline = () => {
    return (
        <Container className='mt-5'>
            <h2>
                <Badge bg="secondary">6.</Badge> Munkafolyamatok
            </h2>
            <VerticalTimeline>
            <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. szeptember vége"
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Követelmények megbeszélése</h3>
            <p>
            A cyan Security által meghirdetett téma átbeszélése, ismerkedés a belső és külső konzulenssel.
            A haladásról hetente, másfél hetente jelentünk a belső konzulensnek.
            A témakidolgozás egy összehasonlítás három, piacon elterjedt technológiáról:
            <ul>
                <li>
                Rácz Máté - ELK Stack (Elastic)
                </li>
                <li>
                Mandl Ábel - EFK Stack
                </li>
                <li>
                Horváth Bálint - Graylog
                </li>
            </ul>
            </p>
        
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. október eleje"
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Linux alapismeretek</h3>
            <h4 className="vertical-timeline-element-subtitle">Parancsok, könyvtárak megismerése</h4>
            <p>
            A feladat elvégzéséhez alapvető Linux ismeretekre van szükség. Ilyen volt a legáltalánosabb linux parancsok megismerése is, mint például
            a <code>cd, ls, cat, cp, rm, mkdir, mv, rmdir</code>.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. október eleje"
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Linux rendszerlogok</h3>
            <h4 className="vertical-timeline-element-subtitle">A var/log mappa</h4>
            <p>
            A linux általános megismerése után fókuszálhattunk a naplófájlokra, hiszen a feladatban is ezek játszák a főszerepet. A <code>/var/log</code> mappa tartalmát
            vizsgáltuk meg, hogy a mi esetünkben az <b>Ubuntu</b>, hogyan tárolja el az alap rendszer által generált logokat.
            Itt megismertük a következő rendszer-log típusokat: <code>syslog, authlog, daemonlog, kernellog, debuglog</code>.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. október 12."
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Logok gyűjtése, módszerek elkülönítése</h3>
            <h4 className="vertical-timeline-element-subtitle">Beats, rsyslog</h4>
            <p>
            A logok "aratásához" több módszer használatos, (<code>Beats, rsyslog...</code>) ezek működésének a tanulmányozása volt a cél.
            A kulcskérdések: Hogyan, milyen fájlokat vizsgálhatnak a szoftverek? Mikor? Hogyan továbbítják az adatot? Milyen beépített funkciókkal rendelkeznek?
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. október 29. "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">VPN, virtuális környezet hozzáférés</h3>
            <p>
            A cyan Security által biztosított virtuális környezethez tartozó jelszavakat, VPN-hozzáféréseket megkaptuk. A kapcsolat tesztelése után megkezdődhetett az érdemi munka.
            </p>
        </VerticalTimelineElement>
    
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. november eleje "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Installáció</h3>
            <h4 className="vertical-timeline-element-subtitle"><code>ELK Stack, EFK Stack, Graylog</code> telepítése virtuális környezetben</h4>
            <p>
            A Stack-eket alkotó komponensek telepítése és tesztelése dokumentáció alapján (GUI elérés, nyers logok gyűjtése).
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. november közepe "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Biztonsági megoldások, szolgáltatások naplói</h3>
            <h4 className="vertical-timeline-element-subtitle">Reverse proxy megvalósítása, <code>NGINX, Apache</code> logok</h4>
            <p>
            Éles környezetben szükséges kihasználni a biztonsági megoldásokat (<code>SSL, Open Distro, xpack-security...</code>), ám tesztelési célból csak egy Reverse Proxy-t telepítettünk a webes felület elé.
            A logok monitorozását kiterjesztettük vállalati környezetben is előforduló szolgáltatásokra.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. november vége "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Szűrés, processzálás</h3>
            <h4 className="vertical-timeline-element-subtitle">Logstash grok pattern, fluentd megoldások </h4>
            <p>
            A jövőben fontos lehet az, hogy ismerjük miként tudunk egyéni naplósorokra egy mintát írni, amely alapján hasznos információkat tudunk kiszűrni.
            A meglévő syslog, nginx, apache logokra írtunk mintát, kinyerve a logok szintjét is, amely egy fontos szűrési szempont.
            Ebben a stádiumban olyan kérdéseket is feltettünk magunknak, hogy érdemes-e külön indexekbe szedni az adatainkat.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2021. december "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Webes felületek lehetőségei, vizualizációk</h3>
            <h4 className="vertical-timeline-element-subtitle">Kibana, Graylog tanulmányozása</h4>
            <p>
           Ennél a pontnál el kellett kezdenünk összehasonlítani a három megoldást, így a webes felületek által nyújtott lehetőségeket is.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="2022. január "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">Dokumentáció, hibák javítása</h3>
            <p>
           Megkezdődött a dokumentáció összeállítása, még tovább ismerkedtünk a rendszerekkel.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(108, 117, 125)' }}
            date="Jövő "
            iconStyle={{ background: 'rgb(108, 117, 125)', color: '#fff' }}
            icon={<FaRecordVinyl color="white"/>}
        >
            <h3 className="vertical-timeline-element-title">A jövő</h3>
            <p>
            Ez a téma rengeteg lehetőséget tartogat a jövőben:
            <ul>
                <li>
                    Biztonsági technikák bevetése
                </li>
                <li>
                    Hatékonyabb indexelés
                </li>
                <li>
                    Klaszterben használat (Kubernetes)
                </li>
                <li>
                    Mesterséges intelligencia bevonása
                </li>
                <li>
                    ...
                </li>
            </ul>
            </p>
        </VerticalTimelineElement>
        </VerticalTimeline>
        </Container>
    )
}
export default Timeline
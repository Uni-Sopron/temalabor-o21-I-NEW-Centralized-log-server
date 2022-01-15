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
            date="2021. október"
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
            date="2021. október"
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
        </VerticalTimeline>
        </Container>
    )
}
export default Timeline
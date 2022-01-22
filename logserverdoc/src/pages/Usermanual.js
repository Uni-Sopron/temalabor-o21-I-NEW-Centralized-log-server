import React from 'react';
import { Container, Badge, Alert } from 'react-bootstrap';
import prompt from '../images/prompt.png'
import kibanastart from '../images/kibana-start.png'
import menu from '../images/menu.png'
import search from '../images/search.png'
import indices from '../images/indices.png'
import manageind from '../images/manage-ind.png'
import createpattern from '../images/createpattern.png'
import indexpatterns from '../images/indexpatterns.png'
import discover from '../images/discover.png'
import query from '../images/query.png'
import resp from '../images/resp.png'
import message from '../images/message.png'
import kql from '../images/kql.png'
import kibanadash from '../images/kibana-dash.png'
import nginxdash from '../images/nginx-dash.png'
import dashboard1 from '../images/dashboard1.png'
import dashboard2 from '../images/dashboard2.png'
import pipelines from '../images/pipelines.png'
import grokdebug from '../images/grokdebug.png'
const Usermanual = () => {
    return (
        <Container className='mt-5'>
        <h2>
            <Badge bg="secondary">4.</Badge> Felhasználói bemutatás
        </h2>
        <hr></hr>
        <Alert variant='info'>
            <Alert.Heading as='h5'>Info</Alert.Heading>
        Ebben a részben a tanulmányozott webes felületek kerülnek tárgyalásra,
        mivel itt a felhasználók célcsoporja rendszermérnökök, DevOps mérnökök, így ilyen minőségben taglaljuk őket.
        
        </Alert>
        <h3>Kibana</h3>
        <p>A Kibana-t weben érhetjük el, alapértelmezetten 5601-es porton, ám egy nginx proxy is konfigurálva lett amely a 80-as portra
            érkező kéréseket fordítja az 5601-es port felé. 
        </p>
        <img src={prompt} width="40%"></img>
        <p>A bejelentkezéshez a Kibana-hoz rendelt felhasználó adatait adjuk meg.</p>
        <p>Belépés és az oldal betöltése után a következő fogad minket:</p>
        <img src={kibanastart} width="80%"></img>
        <p>A menü a bal felső sarok lenyitásával elérhető, vagy a keresett funkciót a megfelelő kulcsszavakkal is megtalálhatjuk.</p>
        <img src={menu} width="20%"></img>
        <img src={search} width="60%" style={{float:"right"}}></img>
        <p>Tekintsük meg a meglévő indexeinket, melyekben a logok találhatóak <b>(Data / Index Management)</b>:</p>
        <img src={indices} width="80%"></img>
        <p>Láthatjuk, hogy a daemon-verzió-dátum nevet használja indexként. Kijelölve tudjuk őket kezelni:</p>
        <img src={manageind} width="35%"></img>
        <p>Ahhoz, hogy az adatainkon lekérdezéseket és egyéb műveleteket
            tudjunk végezni Index Pattern-okat kell létrehozni <b>(Kibana / Index Patterns)</b>:</p>
        <img src={createpattern} width="80%"></img>
        <p>Vegyük észre, hogy a meglévő indexeinkre illeszthető mondjuk a filebeat-* név. (Az összes 'filebeat' kezdetű index ebben lesz).
            Névadás után kattintsunk a '<i>Create index pattern</i>' gombra.
        </p>
        <p>Ugyanezen a fülön láthatjuk a létrehozott Index Pattern-okat.</p>
        <img src={indexpatterns} width="80%"></img>
        <p>Innentől fogva kezelhetjük az adatainkat a webes eszközök segítségével.</p>
        <p><b>Analytics / Discover fül</b>:</p>
        <img src={discover} width="100%"></img>
        <p>A grafikonon láthatjuk hogy egyes időszakokban mennyi volt a beérkezett adat, alatta pedig a kinyert logokat soronként.
            Bal oldalt kiválaszthatő melyik Index Pattern adatait szeretnénk vizsgálni, alatta egy 'Search field names' kereső található,
            amellyel bizonyos mezőkre tudunk szűrni. Az 'Available fields tartalmazza' mindazokat a mezőket, amelyekre lehetne szűrni a kinyert adatok alapján.
            A keresési időintervallum szűkíthető és bővíthető, villámsebességgel tudunk visszamenni akár 1 évvel ezelőtti naplókhoz is.
            A bal felső sarokban található még egy szűrő amivel okosabb, bonyolultabb feltételekkel rendelkező lekérdezéseket tudunk gyártani, melyeket el is tudunk menteni.
            Egy ilyenre példa:
        </p>
        <img src={kql}></img>
        <img src={query}></img>
        <p>Tehát olyan syslog sorokat szeretnénk nézni, ahol a severity level "error" vagy "warning" volt.
             Lényegében az égetően sürgős üzenetekre voltunk kíváncsiak.
             A kapott sorokból 2 rekord:</p>
             <img src={resp} width="100%"></img>
             <p>Az rekordokat "kinyitva" ezeket olvashatjuk:</p>
        <img src={message} width="100%"></img>
        <Alert variant='warning'><Alert.Heading as='h6'>Figyelem</Alert.Heading>
            Itt több mező is volt, de amiket látunk a fontosabbak, amelyeket
            egyébként alapkonfigurációval nem kapunk kézhez. Ezekhez logstash grok filtert kellett alkalmazni.
            A mezők száma alkalmazott komponensektől is függ, az EFK Stack esetében lényegesen kevesebb mezőt kaptunk.</Alert>
            <p>A fenti megállapítás miatt, most a fejlesztői eszközök közül Grok Debugger használatát mutatnám be, illetve tippeket adnék, hogy hogyan
                érdemes elkezdeni a Grok Pattern-ok írását. (<b>Dev Tools / Grok Debugger</b>):
            </p>
            <img src={grokdebug} width="100%"></img>
            <p>A 'Sample Data' sorokba illeszünk be mondjuk syslog sorokat. Próbálkozzunk a mezők felismerésével,
                 nyilván olyan módon, hogy az elvárásainknak megfeleljen a kimenet. A grok szintaktikát tanulmányozhatjuk  
                 <a href='https://github.com/hpcugent/logstash-patterns/blob/master/files/grok-patterns' className='link-style'  target="_blank"> ebből a github repository-ból.
                  </a> A megírt grok patternt illesszük be, majd nyomjunk a 'Simulate' gombra. A 'Structured Data' alatt jelenik meg JSON formátumban,
                    hogy mit sikerült kiszűrnünk az első sorból. </p>
            <p>Ami még érdekes lehet a számunkra, az a dashboard-ok készítése. A Filebeat biztosít beépített dashboard-okat is,
                de magunk is létrehozhatunk újakat. <b>(Analytics / Dashboard)</b>:
            </p>
            <img src={kibanadash} width="100%"></img>
            <p>Figyeljük meg hogy a Filebeat mennyi előre elkészített mintával jön. Nginx példa:</p>
            <img src={nginxdash} width="100%"></img>
            <i>Ez csak egy részlete ennek a kimutatásnak. Azért mutathat inkonzisztens adatokat, mert a Logstash által specifikusabb szűrések is végbementek,
                 ezek a kimutatások csak az alap Filebeat konfigurációval használhatóak.</i>
            
            <p>Saját kimutatást pár perc alatt egyszerűen lehet csinálni.
                Csak a használandó mezőket kell kiválasztanunk, a kívánt vizualizációt és kész is.
                Saját kimutatás syslog-ra:</p>
                <img src={dashboard1} width="100%"></img>
                <img src={dashboard2} width="100%"></img>
            <p>A Logstash által kezelt pipeline-okat a <b>(Management / Ingest / Ingest Pipelines)</b> felün kezelhetjük.</p>
            <img src={pipelines} width="100%"></img>
            <Alert variant='warning'><Alert.Heading as='h6'>Figyelem
                </Alert.Heading>Az összehasonlító munka során csak a bemutatott füleket tanulmányoztuk át.
                 Ám ezekkel a lehetőségek nem fogytak el. A jövőben több figyelmet kaphatnak az alábbiak:
                 <ul>
                     <li>
                         Alerting rendszer
                     </li>
                     <li>
                         Rollup Jobs
                     </li>
                     <li>
                         Index lifecycle management
                     </li>
                     <li>
                         Machine Learning
                     </li>
                     <li>
                         Stb.
                     </li>
                     </ul></Alert>
        <h3>Graylog</h3>
        <p>...</p>
    </Container>
    )
}
export default Usermanual
import { useState } from 'react';
import Sidebar from '../Sidebar';
import FileUpload from '../FileUpload';
import AttributeTable from '../AttributeTable';
import GeoMap from '../GeoMap';
import { MainLayout } from './style'
import { prepareReport } from '../../reports/reporter'

import {
    Container,
    Row,
    Col,
    Card,
} from 'react-bootstrap';

const geomapStyle = {
    position: "relative", 
    minHeight: "500px", 
    height: "100%", 
    width: "100%"
}

interface IStoreItem {
    Store: string[]
}

interface Feature {
    type: string,
    properties: {
        [key: string]: string | number | IStoreItem,
    },
    geometry?: {
        coordinates: number[]
    },
}

interface IGeoJSON {
    type: string,
    features: Feature[]
}

interface IPrettyReport {
    attrName: string,
    attrPresents: number,
    attrValidity: number,
}

const App = () => {
    
    const [geojson, setGeojson] = useState<IGeoJSON>();
    const [report, setReport] = useState<IPrettyReport[]>();
    
    const onUploadFile = async (file: File | null) => {
        if(file && file.name.endsWith(".geojson")) {
            const fileContent: string = await file.text();

            // handle not good json
            const parsedContent: IGeoJSON = JSON.parse(fileContent);
            
            setReport(prepareReport(parsedContent));
            setGeojson(parsedContent);
        } else {
            if(file) {
                const extension = file.name.split(".")[1]
                alert(`ERROR: File must have .geojson extension! Your file has ${extension.toUpperCase()} format.`)
            }
        }
    }

    return (
        <div style={{backgroundColor: "#f0f0f0"}}>
            <Sidebar title="Spider GeoJSON evaluation tool">
                <FileUpload 
                    onUploadFile={onUploadFile}
                />
                {/* <div style={btnStartStyle}>
                    <Button variant="primary">Start Evaluation</Button>
                </div> */}
            </Sidebar>
            <MainLayout>
                <Container className="m-0" fluid>
                    <Row>
                        <Col sm={12} md={12} lg={12} xl={6} xxl={4}>
                            <Card style={{padding: "1rem"}}>
                                <AttributeTable
                                    className="m-0"
                                    attribtesType="Attribute"
                                    attributes={report}
                                />
                            </Card>
                            <br/>
                        </Col>
                        <Col sm={12} md={12} lg={12} xl={6} xxl={8}>
                            <GeoMap 
                                style={geomapStyle}
                                geolayer={geojson}
                            />
                        </Col>
                    </Row>
                </Container>
            </MainLayout>
        </div>
    );
}

export default App;

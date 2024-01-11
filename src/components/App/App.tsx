import { useState } from 'react';
import Sidebar from '../Sidebar';
import FileUpload from '../FileUpload';
import AttributeTable from '../AttributeTable';
import GeoMap from '../GeoMap';
import { ToastContainer, toast } from 'react-toastify';
import { MainLayout } from './style'

import { prepareReport } from '../../reports/reporter'
import { parseJSON } from '../../utils/parseJSON'; 
import { isGeoJSONValid } from '../../validators/geojson'; 

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
    
    const [filename, setFilename] = useState<string>();
    const [geojson, setGeojson] = useState<IGeoJSON>();
    const [report, setReport] = useState<IPrettyReport[]>();

    const toastError = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            theme: "colored",
        });
    }

    const toastSuccess = (message: string) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            theme: "colored",
        });
    }
    
    const onUploadFile = async (file: File | null) => {
        if(file && file.name.endsWith(".geojson")) {
            
            const fileContent: string = await file.text();
            const parsedJSON = parseJSON(fileContent);
            
            if(parsedJSON !== null && isGeoJSONValid(parsedJSON)) {

                setFilename(file.name);
                setReport(prepareReport(parsedJSON));
                setGeojson(parsedJSON);

                toastSuccess("Successful upload");
            } else {
                const msg = `
                    ERROR: Invalid GeoJSON structure.
                    More info - https://geojson.org
                `
                toastError(msg);
            }

        } else {
            if(file) {
                const extension = file.name.split(".")[1]
                
                const msg = `
                    ERROR: File must have .geojson extension!
                    Your file has ${extension.toUpperCase()} format.
                `
                toastError(msg);
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
                <ToastContainer style={{ width: "fit-content", maxWidth: "400px", minWidth: "200px"}}/>
                <Container className="m-0" fluid>
                    <Row>
                        <Col>
                            <Card style={{padding: "1rem", marginBottom: '1rem'}}>
                                <span><strong>Filename: </strong>{filename}</span>
                                <span><strong>Places count: </strong>{geojson === undefined ? 0 : geojson.features.length}</span>
                            </Card>
                        </Col>                        
                    </Row>
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

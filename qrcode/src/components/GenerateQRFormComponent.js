import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { saveAs } from 'file-saver'

function BasicExample() {
    let [data, setData] = useState("");
    let [bgColor, setBGColor] = useState("000000");
    let [qrColor, setQRColor] = useState("000000");
    let [width, setWidth] = useState(150);
    let [height, setHeight] = useState(150);
    let [format, setFormat] = useState("Select a format");

    let [qrCodeURL, setQRCodeURL] = useState("");


    const apiRead = async () => {
        try {
            let url = 'https://api.qrserver.com/v1/create-qr-code/?' + new URLSearchParams({
                size: `${height}x${width}`,
                data: `${data}`,
                color: `${qrColor}`,
                bgcolor: `${bgColor}`,
                format: `${format}`
            })
            console.log(url)
            await fetch(url)
                .then(response => {
                    console.log(response.url)
                    setQRCodeURL(response.url)
                })
        }
        catch (error) {
            console.log("Failed")
        }
    }

    const downloadImage = () => {
        saveAs(qrCodeURL, `qrcode.${format}`) // Put your image URL here.
    }

    return (
        <Form style={{ backgroundColor: "white", textAlign: "left", opacity: "0.95", borderRadius: "10px", minWidth: "360px" }} className='w-50 mx-auto p-2 m-2'>
            <h3 style={{ textAlign: "center" }}>QR Code Generator</h3>
            <Form.Group className="mb-3" controlId="formBasicData">
                <Form.Label>Enter data</Form.Label>
                <Form.Control type="text" placeholder="Enter data" onChange={(e) => {
                    setData(e.target.value)
                }} />
                <Form.Text className="text-muted">
                    We'll never share your data with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWidth">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" placeholder="Enter width" onChange={(e) => {
                    setWidth(e.target.value)
                }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicHeight">
                <Form.Label>Height</Form.Label>
                <Form.Control type="number" placeholder="Enter height" onChange={(e) => {
                    setHeight(e.target.value)
                }} />
            </Form.Group>

            <Form.Group className="mb-3 d-inline-block pe-5" controlId="formBasicBGColor">
                <Form.Label>Background Color</Form.Label>
                <Form.Control type="color" placeholder="" onChange={(e) => {
                    setBGColor(e.target.value.substring(1))
                }} />
            </Form.Group>

            <Form.Group className="mb-3 d-inline-block" controlId="formBasicQRColor">
                <Form.Label>QR Color</Form.Label>
                <Form.Control type="color" placeholder="" onChange={(e) => {
                    setQRColor(e.target.value.substring(1))
                }} />
            </Form.Group>

            <InputGroup>
                <InputGroup.Text>Format</InputGroup.Text>
                <DropdownButton
                    variant="outline-secondary"
                    title={format}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item href="#" onClick={() => {
                        setFormat("svg")
                    }}>SVG</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => {
                        setFormat("png")
                    }}>PNG</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => {
                        setFormat("jpg")
                    }}>JPG</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            <Button variant="primary" type="submit" className='w-25 mt-5 mb-2' onClick={(e) => {
                e.preventDefault()
                apiRead()
            }}>
                Submit
            </Button>
            <br />
            {
                (qrCodeURL !== null && qrCodeURL.length !== 0) ? <div><h4>QR Code :</h4><img src={qrCodeURL} alt="" title="" />
                    <br /><Button variant="primary" type="button" className='w-25 mt-5 mb-2' onClick={(e) => {
                        e.preventDefault()
                        downloadImage()
                    }}>
                        Download
                    </Button>
                </div> : null
            }

        </Form>

    );
}

export default BasicExample;
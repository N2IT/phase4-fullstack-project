import React, { useState, useContext, useEffect } from 'react';
import { useFormik, Field } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateNewConfiguration = () => {

    const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm } = useContext(AgentContext);

    const [completeUnit, setAsCompleteUnit] = useState(true)
    // const [ checked, setAsChecked ] = useState(true)
    const [housing, setHousing] = useState(true)
    const [sideTrack, setSideTrack] = useState(true)
    const [hemBar, setHemBar] = useState(true)
    const [fabric, setFabric] = useState(true)
    const [motorTube, setMotorTube] = useState(true)
    const [disabled, setAsDisabled] = useState(true)
    const [motorType, setMotorType] = useState("")
    const [unitWidth, setUnitWidth] = useState()
    const [unitHeight, setUnitHeight] = useState()
    const [housingTubeSize, setHousingTubeSize] = useState("")
    const [housingType, setHousingType] = useState("")


    const get_motor_charge = (motor_type) => {

        let motor_type_price = 0

        if (motor_type === 'Alpha pro+OD')
            motor_type_price = 0
        if (motor_type === 'Somfy RTS' || motor_type == 'Somfy Hardwired')
            motor_type_price = 300
        if (motor_type === 'Somfy Autosun')
            motor_type_price = 600
        return motor_type_price
    }

    const get_power_chord_price = (power_chord) => {
        let power_chord_price = 0
        if (power_chord === '6ft with pigtail(Alpha)') {
            power_chord_price = 0
        }
        if (power_chord === '32ft with pigtail(Alpha)') {
            power_chord_price = 85
        }
        if (power_chord === '30ft BLACK with molded plug (Alpha)') {
            power_chord_price = 95
        }
        return power_chord_price
    }

    const get_tube_price = (housing_tube_size) => {
        let housing_tube_price = 0

        if (housing_tube_size == 'Standard(4.5")') {
            housing_tube_price = 549.26
        }
        if (housing_tube_size == 'Jumbo(5.75")') {
            housing_tube_price = 670
        }
        if (housing_tube_size == 'Micro(3.5")') {
            housing_tube_price = 447.01
        }
        return housing_tube_price
    }

    const get_housing_price = (housing_type, housingTubeSize) =>{
        let housing_type_price = 0

        if (housing_type === 'Complete' && housingTubeSize === 'Standard(4.5")') {
          housing_type_price = 174.04
        }
        if (housing_type === 'Housing Base(no cover)' && housingTubeSize === 'Standard(4.5")'){
            housing_type_price = 174.04
        }
        if ((housing_type === 'Complete' && housingTubeSize === 'Jumbo(5.75")') || (housing_type === 'Housing Base(no cover)' && housingTubeSize === 'Jumbo(5.75")')) {
            housing_type_price = 212.46
        }
        if ((housing_type === 'Complete' && housing_tube_size ==='Micro(3.5")') || (housing_type == 'Housing Base(no cover)' && housing_tube_size == 'Micro(3.5")')){
            housing_type_price = 156.37
        }
        return housing_type_price
    }

    const handleToggle = (id) => {
        if (id === 'complete_unit') {
            setAsCompleteUnit(!completeUnit)
        }
        else if (id === 'housing') {
            setHousing(!housing)
        }
        else if (id === 'side_track') {
            setSideTrack(!sideTrack)
        }
        else if (id === 'hem_bar') {
            setHemBar(!hemBar)
        }
        else if (id === 'fabric') {
            setFabric(!fabric)
        }
        else if (id === 'motor_tube') {
            setMotorTube(!motorTube)
        }
    }

    const formSchema = yup.object().shape({
        project_name: yup.string(),
        unit_name: yup.string(),
        complete_unit: yup.string(),
        housing: yup.string(),
        side_track: yup.string(),
        hem_bar: yup.string(),
        fabric: yup.string(),
        motor_tube: yup.string(),
        motor_side: yup.string(),
        power_chord: yup.string(),
        motor_charge: yup.string(),
        tube_charge: yup.string(),
        housing_charge: yup.string(),
        retention_type: yup.string(),
        retention_cap_color: yup.string(),
        left_retention: yup.string(),
        right_retention: yup.string(),
        tracks_exact_length: yup.string(),
        tracks_charge: yup.string(),
        hem_bar_type: yup.string(),
        hem_cap_color: yup.string(),
        pile_brush_style: yup.string(),
        hem_bar_charge: yup.string(),
        fabric_type: yup.string(),
        fabric_selection: yup.string(),
        seam_location: yup.string(),
        seam_location_num: yup.string(),
        zipper_color: yup.string(),
        usable_fabric_width: yup.string(),
        rotate_fabric: yup.string(),
        fabric_charge: yup.string(),
        color_collection: yup.string(),
        frame_color: yup.string(),
        powder_charge: yup.string(),
        list_price: yup.string(),
        quote_id: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            project_name: "",
            unit_name: "",
            complete_unit: `${completeUnit}`,
            housing: `${housing}`,
            side_track: `${sideTrack}`,
            hem_bar: `${hemBar}`,
            fabric: `${fabric}`,
            motor_tube: `${motorTube}`,
            housing_tube_size: "",
            motor_type: `${motorType}`,
            motor_side: "",
            power_chord: "",
            motor_charge: 0,
            tube_charge: 0,
            housing_charge: 0,
            retention_type: "",
            retention_cap_color: "",
            left_retention: "",
            right_retention: "",
            tracks_exact_length: "",
            tracks_charge: 0,
            hem_bar_type: "",
            hem_cap_color: "",
            pile_brush_style: "",
            hem_bar_charge: 0,
            fabric_type: "",
            fabric_selection: "",
            seam_location: "",
            seam_location_num: "",
            zipper_color: "",
            usable_fabric_width: "",
            rotate_fabric: "",
            fabric_charge: 0,
            color_collection: "",
            frame_color: "",
            powder_charge: 0,
            list_price: 0,
            quote_id: `${quote.id}`,
            created_by: `${agent.id}`,
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/configurations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((r) => r.json())
                .then((data) => {
                    {
                        data.errors ? setErrors(data.errors) :
                            setConfiguration(data),
                            onSubmitNewQuoteForm(),
                            navigate(`/quotes/${quote.id}`),
                            alert(`Configuration ${data.id} has been successfully created.`)
                    }
                })
        }
    })

    useEffect(() => {
        const total = formik.values.motor_charge + formik.values.tube_charge + formik.values.housing_charge
        formik.setFieldValue('list_price', total);
    }, [formik.values.motor_charge, formik.values.unit_width, formik.values.housing_tube_size, formik.values.housing_type]);

    // WORKING THROUGH HOW PRICING UPDATES WHEN CHANGES ARE MADE TO HOUSING & TUBE OR HOUSING TYPE
    // NEED TO REFER TO HOW IT IS HANDELED WITHIN MOTOR TYPE AND POWERCHORD FOR REFERENCE

    return (
        <>
            <Container>
                <div className="account-details">
                    <h2>Configure your product:</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6} xs={12}>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="project_name">Project Name </label><br />
                                        <input
                                            id="project_name"
                                            name="project_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_name}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.sku}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="unit_name">Unit Name </label><br />
                                        <input
                                            id="unit_name"
                                            name="unit_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.unit_name}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.unit_name}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <Row>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="complete_unit">Complete Unit </label>
                                        <input
                                            type="checkbox"
                                            id="complete_unit"
                                            name="complete_unit"
                                            onChange={() => handleToggle('complete_unit')}
                                            value={completeUnit}
                                            checked={completeUnit}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="housing">Housing </label>
                                        <input
                                            type="checkbox"
                                            id="housing"
                                            name="housing"
                                            onChange={() => handleToggle('housing')}
                                            value={housing}
                                            checked={housing}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.housing} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="side_track">Side Track </label>
                                        <input
                                            type="checkbox"
                                            id="side_track"
                                            name="side_track"
                                            onChange={() => handleToggle('side_track')}
                                            value={sideTrack}
                                            checked={sideTrack}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.side_track} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="hem_bar">Hem Bar </label>
                                        <input
                                            type="checkbox"
                                            id="hem_bar"
                                            name="hem_bar"
                                            onChange={() => handleToggle('hem_bar')}
                                            value={hemBar}
                                            checked={hemBar}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.hem_bar} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="hem_bar">Hem Bar </label>
                                        <input
                                            type="checkbox"
                                            id="hem_bar"
                                            name="hem_bar"
                                            onChange={() => handleToggle('hem_bar')}
                                            value={hemBar}
                                            checked={hemBar}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.hem_bar} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="fabric">Fabric </label>
                                        <input
                                            type="checkbox"
                                            id="fabric"
                                            name="fabric"
                                            onChange={() => handleToggle('fabric')}
                                            value={fabric}
                                            checked={fabric}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.fabric} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="motor_tube">Motor Tube </label>
                                        <input
                                            type="checkbox"
                                            id="motor_tube"
                                            name="motor_tube"
                                            onChange={() => handleToggle('motor_tube')}
                                            value={motorTube}
                                            checked={motorTube}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.motor_tube} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} xs={12}>
                                <label htmlFor="unit_width">Unit Width </label>
                                <input
                                    id="unit_width"
                                    name="unit_width"
                                    required
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.setFieldValue("unit_width", value);
                                        setUnitWidth(value)
                                        formik.setFieldValue("tube_charge", ((value / 12) * 20.66) + get_tube_price(housingTubeSize))
                                        formik.setFieldValue("housing_charge", ((value / 12) * 30.21) + get_housing_price(housingType, housingTubeSize));
                                    }} />
                                <p style={{ color: 'red' }}> {formik.errors.unit_width} </p>
                                <label htmlFor="unit_height">Unit Height </label>
                                <input
                                    id="unit_height"
                                    name="unit_height"
                                    onChange={formik.handleChange}
                                    value={formik.values.unit_height}
                                    required
                                />
                                <p style={{ color: 'red' }}> {formik.errors.unit_height} </p>
                            </Col>
                            <Col md={6} xs={12}>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="housing_tube_size">Housing & Tube Size </label>
                                        <select
                                            id="housing_tube_size"
                                            name="housing_tube_size"
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("housing_tube_size", value);
                                                setHousingTubeSize(value)
                                                const basePrice = get_tube_price(value);
                                                const additionalPrice = ((unitWidth / 12) * 20.66);
                                                formik.setFieldValue("tube_charge", basePrice + additionalPrice);
                                                formik.setFieldValue("housing_charge",((unitWidth / 12) * 30.21) + get_housing_price(housingType, value ))
                                            }}
                                            required
                                        >
                                            <option value=''>Select a Housing & Tube Size </option><br />
                                            <option value='Standard(4.5")' label='Standard(4.5")'>Standard(4.5") </option>
                                            <option value='Jumbo(5.75")' label='Jumbo(5.75")'>Jumbo(5.75") </option>
                                            <option value='Micro(3.5")' label='Micro(3.5")' >Micro(3.5") </option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.housing_tube_size} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="housing_type">Housing Type </label><br />
                                        <select
                                            id="housing_type"
                                            name="housing_type"
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("housing_type", value);
                                                setHousingType(value)
                                                const basePrice = get_housing_price(value, housingTubeSize);
                                                const additionalPrice = ((unitWidth / 12) * 30.21);
                                                formik.setFieldValue("housing_charge", basePrice + additionalPrice);
                                            }}
                                            required
                                        >
                                            <option value=''>Select a Housing Type </option>
                                            <option value='Complete' label='Complete'>Complete </option>
                                            <option value='Housing Base(no cover)' label='Housing Base(no cover)'>Housing Base(no cover) </option>
                                            <option value='Open Mount Brackets' label='Open Mount Brackets'>Open Mount Brackets </option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.housing_type} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="motor_type">Motor Type </label><br />
                                        <select
                                            id="motor_type"
                                            name="motor_type"
                                            required
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("motor_type", value);
                                                const basePrice = get_motor_charge(value);
                                                const additionalPrice = get_power_chord_price(formik.values.power_chord);
                                                formik.setFieldValue("motor_charge", basePrice + additionalPrice);
                                            }}>
                                            <option value=''>Select a Motor Type </option>
                                            <option value='Alpha pro+OD' label='Alpha pro+OD'>Alpha pro+OD </option>
                                            <option value='Somfy RTS' label='Somfy RTS'>Somfy RTS </option>
                                            <option value='Somfy Hardwired' label='Somfy Hardwired'>Somfy Hardwired </option>
                                            <option value='Somfy Autosun' label='Somfy Autosun' disabled={disabled}>Somfy Autosun</option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.motor_type} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="motor_side">Motor Side </label><br />
                                        <select
                                            id="motor_side"
                                            name="motor_side"
                                            onChange={formik.handleChange}
                                            value={formik.values.motor_side}
                                        >
                                            <option value=''>Select a Motor Side</option>
                                            <option value='Left' label='Left'>Left </option>
                                            <option value='Right' label='Right'>Right </option>

                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.motor_side} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="power_chord">Power Chord </label>
                                        <select
                                            id="power_chord"
                                            name="power_chord"
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("power_chord", value);
                                                const motorTypePrice = get_motor_charge(formik.values.motor_type);
                                                const powerChordPrice = get_power_chord_price(value);
                                                formik.setFieldValue("motor_charge", motorTypePrice + powerChordPrice);
                                            }}>
                                            <option value=''>Select a Power Chord</option>
                                            <option value='6ft with pigtail(Alpha)' label='6ft with pigtail(Alpha)'>6ft with pigtail(Alpha) </option>
                                            <option value='32ft with pigtail(Alpha)' label='32ft with pigtail(Alpha)'>32ft with pigtail(Alpha) </option>
                                            <option value='30ft BLACK with molded plug (Alpha)' label='30ft BLACK with molded plug (Alpha)'>30ft BLACK with molded plug (Alpha)</option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.power_chord} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="motor_charge">Motor Charge $</label>
                                        <input
                                            id="motor_charge"
                                            name="motor_charge"
                                            value={formik.values.motor_charge}
                                            disabled
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.motor_charge} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="tube_charge">Tube Charge $</label>
                                        <input
                                            id="tube_charge"
                                            name="tube_charge"
                                            value={formik.values.tube_charge}
                                            disabled
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.tube_charge} </p>
                                    </Col>
                                    <Col md={3} xs={12}>
                                        <label htmlFor="housing_charge">Housing Charge $</label>
                                        <input
                                            id="housing_charge"
                                            name="housing_charge"
                                            value={formik.values.housing_charge}
                                            disabled
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.housing_charge} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} xs={12}>
                                <label htmlFor="quote_id">Quote Id </label><br />
                                <input
                                    id="quote_id"
                                    name="quote_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.quote_id}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.quote_id} </p>
                            </Col>
                            <Col md={3} xs={12}>
                                <label htmlFor="created_by">Created By </label><br />
                                <input
                                    id="created_by"
                                    name="created_by"
                                    onChange={formik.handleChange}
                                    value={formik.values.created_by}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                            </Col>
                            <Col md={3} xs={12}>
                                <label htmlFor="status">Status </label><br />
                                <input
                                    id="status"
                                    name="status"
                                    onChange={formik.handleChange}
                                    value={formik.values.status}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.status}</p>
                            </Col>
                            <Col md={3} xs={12}>
                                <label htmlFor="list_price">Total Price $</label><br />
                                <input
                                    id="list_price"
                                    name="list_price"
                                    onChange={formik.handleChange}
                                    value={formik.values.list_price}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.list_price}</p>
                            </Col>



                        </Row>


                        <button type="submit">Submit</button>
                    </form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                </div>
            </Container >
        </>
    )
}

export default CreateNewConfiguration
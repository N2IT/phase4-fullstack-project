import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateNewConfiguration = () => {

    const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm } = useContext(AgentContext);

    const [completeUnit, setAsCompleteUnit] = useState(true)
    const [housing, setHousing] = useState(true)
    const [sideTrack, setSideTrack] = useState(true)
    const [hemBar, setHemBar] = useState(true)
    const [fabric, setFabric] = useState(true)
    const [motorTube, setMotorTube] = useState(true)
    const [disabled, setAsDisabled] = useState(true)
    const [motorType, setMotorType] = useState("")
    const [unitWidth, setUnitWidth] = useState(0)
    const [unitHeight, setUnitHeight] = useState(0)
    const [housingTubeSize, setHousingTubeSize] = useState("")
    const [housingType, setHousingType] = useState("")
    const [retentionType, setRetentionType] = useState("")
    const [tracksExactLength, setTracksExactLength] = useState(false)
    const [hemBarType, setHemBarType] = useState("")
    const [fabricType, setFabricType] = useState("")


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

    const get_housing_price = (housing_type, housingTubeSize) => {
        let housing_type_price = 0

        if (housing_type === 'Complete' && housingTubeSize === 'Standard(4.5")') {
            housing_type_price = 174.04
        }
        if (housing_type === 'Housing Base(no cover)' && housingTubeSize === 'Standard(4.5")') {
            housing_type_price = 174.04
        }
        if ((housing_type === 'Complete' && housingTubeSize === 'Jumbo(5.75")') || (housing_type === 'Housing Base(no cover)' && housingTubeSize === 'Jumbo(5.75")')) {
            housing_type_price = 212.46
        }
        if ((housing_type === 'Complete' && housing_tube_size === 'Micro(3.5")') || (housing_type == 'Housing Base(no cover)' && housing_tube_size == 'Micro(3.5")')) {
            housing_type_price = 156.37
        }
        return housing_type_price
    }

    const getRetentionPricing = (retentionType) => {
        let retention_type_pricing = 0
        if (retentionType === 'Surface Mount') {
            retention_type_pricing = 60.19
        }
        if (retentionType === 'Recessed') {
            retention_type_pricing = 75.17
        }
        if (retentionType === 'Cable Guide') {
            retention_type_pricing = 200
        }
        return retention_type_pricing
    }

    const getHemBarPricing = (hemBarType) => {
        let hem_bar_pricing = 0
        if (hemBarType === 'Tall') {
            hem_bar_pricing = 72.88
        }
        if (hemBarType === 'Standard') {
            hem_bar_pricing = 66.39
        }
        if (hemBarType === 'Lanai') {
            hem_bar_pricing = 272.88
        }
        return hem_bar_pricing
    }

    const getFabricPricing = (fabricType) => {
        let fabric_price = 0

        if (fabricType == 'Twitchell Nano 50') {
            fabric_price = 151.26
        }
        if (fabricType == 'Twitchell Nano 55') {
            fabric_price = 151.77
        }
        if (fabricType == 'Twitchell Nano 60') {
            fabric_price = 161.84
        }
        if (fabricType == 'Twitchell Nano 70') {
            fabric_price = 193.61
        }
        if (fabricType == 'Twitchell Nano 95') {
            fabric_price = 261.67
        }
        if (fabricType == 'Twitchell Nano 99') {
            fabric_price = 151.26
        }
        if (fabricType == 'Twitchell Dimout') {
            fabric_price = 352.43
        }
        if ((fabricType == 'Twitchell Textilene 80') || (fabricType == 'Twitchell Textilene 95')) {
            fabric_price = 202.68
        }
        if (fabricType == 'Twitchell Textilent 90') {
            fabric_price = 232.93
        }
        if (fabricType == 'Ferrari Soltis Perform') {
            fabric_price = 484.02
        }
        if (fabricType == 'Ferrari Soltis Opaque B92') {
            fabric_price = 1246.34
        }
        if (fabricType == 'Ferrari Soltis Proof') {
            fabric_price = 653.42
        }
        if (fabricType == 'Ferrari Soltis Veozip') {
            fabric_price = 261.67
        }
        if (fabricType == 'Ferrari Soltis Horizon') {
            fabric_price = 591.41
        }
        if (fabricType == 'Ferrari Harmony') {
            fabric_price = 529.39
        }
        if (fabricType == 'Mermett Natte 3%') {
            fabric_price = 423.52
        }
        if (fabricType == 'Mermett Natte 5%') {
            fabric_price = 391.80
        }
        if (fabricType == 'Mermett Natte 10%') {
            fabric_price = 370.58
        }
        if (fabricType == 'Mermet Satine 1%') {
            fabric_price = 432.59
        }
        if (fabricType == 'Mermet Satine 5%') {
            fabric_price = 400.83
        }
        if (fabricType == 'Twitchell OmegaTex') {
            fabric_price = 642.84
        }
        if (fabricType == 'Sunbrella 60 (Solid)') {
            fabric_price = 529.39
        }
        return fabric_price
    }

   useEffect(() => {
        if (!housing || !sideTrack || !hemBar || !fabric || !motorTube) {
            setAsCompleteUnit(false)
            formik.setFieldValue('complete_unit', false)
        }
        if (housing && sideTrack && hemBar && fabric && motorTube) {
            setAsCompleteUnit(true)
            formik.setFieldValue('complete_unit', true)
        }
    },[housing, sideTrack, hemBar, fabric, motorTube])

    const handleCheckboxChange = (event) => {
        console.log(event)
        if (event.target.id === 'housing') {
            setHousing(event.target.checked);
            formik.setFieldValue('housing', event.target.checked);
        }
        if (event.target.id === 'side_track'){
            setSideTrack(event.target.checked);
            formik.setFieldValue('side_track', event.target.checked)
        }
        if (event.target.id === 'hem_bar'){
            setHemBar(event.target.checked);
            formik.setFieldValue('hem_bar', event.target.checked)
        }
        if (event.target.id === 'fabric') {
            setFabric(event.target.checked);
            formik.setFieldValue('fabric', event.target.checked);
        }
        if (event.target.id === 'motor_tube'){
            setMotorTube(event.target.checked);
            formik.setFieldValue('motor_tube', event.target.checked);
        }
    };

    const formSchema = yup.object().shape({
        project_name: yup.string(),
        unit_name: yup.string(),
        complete_unit: yup.boolean(),
        housing: yup.boolean(),
        side_track: yup.boolean(),
        hem_bar: yup.boolean(),
        fabric: yup.boolean(),
        motor_tube: yup.boolean(),
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
            complete_unit: true,
            housing: true,
            side_track: true,
            hem_bar: true,
            fabric: true,
            motor_tube: true,
            housing_tube_size: "",
            motor_type: "",
            motor_side: "",
            power_chord: "",
            motor_charge: 0,
            tube_charge: 0,
            housing_charge: 0,
            retention_type: "",
            retention_cap_color: "",
            left_retention: "",
            right_retention: "",
            tracks_exact_length: false,
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
            console.log(values)
            debugger
            // fetch("/api/configurations", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(values),
            // })
            //     .then((r) => r.json())
            //     .then((data) => {
            //         {
            //             data.errors ? setErrors(data.errors) :
            //                 setConfiguration(data),
            //                 onSubmitNewQuoteForm(),
            //                 navigate(`/quotes/${quote.id}`),
            //                 alert(`Configuration ${data.id} has been successfully created.`)
            //         }
            //     })
        }
    })

    useEffect(() => {
        const total = formik.values.motor_charge + formik.values.tube_charge + formik.values.housing_charge + formik.values.tracks_charge + formik.values.hem_bar_charge + formik.values.fabric_charge
        formik.setFieldValue('list_price', total);
    }, [formik.values.motor_charge, formik.values.unit_width, formik.values.unit_height, formik.values.housing_tube_size, formik.values.housing_type, formik.values.retention_type, formik.values.hem_bar_type, formik.values.fabric_type]);

    return (
        <>
            <Container>
                <div className="account-details">
                    <h2>Configure your product:</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6} xs={12}>
                                <h3>Unit Information</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="project_name">Project Name </label><br />
                                        <input
                                            id="project_name"
                                            name="project_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_name}
                                            required
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
                                            required
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.unit_name}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Unit Contents</h3>
                                <Row>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="complete_unit"
                                                name="complete_unit"
                                                onChange={formik.handleChange}
                                                value={formik.values.complete_unit}
                                                checked={completeUnit}
                                            />
                                            <label htmlFor="complete_unit" style={{ whiteSpace: 'nowrap' }}>Complete Unit </label>
                                            <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="housing"
                                                name="housing"
                                                value={formik.values.housing}
                                                checked={housing}
                                                onChange={(e) => handleCheckboxChange(e)}
                                            />

                                            <label htmlFor="housing" style={{ whiteSpace: 'nowrap' }}>Housing </label>
                                            <p style={{ color: 'red' }}> {formik.errors.housing} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="side_track"
                                                name="side_track"
                                                checked={formik.values.side_track}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={sideTrack}
                                            />
                                            <label htmlFor="side_track" style={{ whiteSpace: 'nowrap' }}>Side Track </label>
                                            <p style={{ color: 'red' }}> {formik.errors.side_track} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="hem_bar"
                                                name="hem_bar"
                                                checked={formik.values.hem_bar}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={hemBar}
                                            />
                                            <label htmlFor="hem_bar" style={{ whiteSpace: 'nowrap' }}>Hem Bar </label>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="fabric"
                                                name="fabric"
                                                checked={formik.values.fabric}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={fabric}
                                            />
                                            <label htmlFor="fabric" style={{ whiteSpace: 'nowrap' }}>Fabric </label>
                                            <p style={{ color: 'red' }}> {formik.errors.fabric} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="motor_tube"
                                                name="motor_tube"
                                                checked={formik.values.motor_tube}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={motorTube}
                                            />
                                            <label htmlFor="motor_tube" style={{ whiteSpace: 'nowrap' }}>Motor Tube </label>
                                            <p style={{ color: 'red' }}> {formik.errors.motor_tube} </p>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col md={6} xs={12}>
                                <h3>Unit Size</h3>
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
                                        formik.setFieldValue("hem_bar_charge", ((value / 12) * 12) + getHemBarPricing(hemBarType))
                                        formik.setFieldValue("fabric_charge", (((value * unitHeight) / 144) * 2.83) + getFabricPricing(fabricType))
                                    }} />
                                <p style={{ color: 'red' }}> {formik.errors.unit_width} </p>
                                <label htmlFor="unit_height">Unit Height </label>
                                <input
                                    id="unit_height"
                                    name="unit_height"
                                    required
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.setFieldValue("unit_height", value);
                                        setUnitHeight(value)
                                        formik.setFieldValue("tracks_charge", ((value / 12) * 23.69) + getRetentionPricing(retentionType))
                                        formik.setFieldValue("housing_charge", ((value / 12) * 30.21) + get_housing_price(housingType, housingTubeSize));
                                        formik.setFieldValue("fabric_charge", (((value * unitWidth) / 144) * 2.83) + getFabricPricing(fabricType))
                                    }} />
                                <p style={{ color: 'red' }}> {formik.errors.unit_height} </p>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Housing & Motor Options</h3>
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
                                                formik.setFieldValue("housing_charge", ((unitWidth / 12) * 30.21) + get_housing_price(housingType, value))
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
                                    {housing ?
                                        <Col md={6} xs={12}>
                                            <>
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
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
                                    {motorTube ?
                                        <Col md={6} xs={12}>
                                            <label htmlFor="motor_type">Motor Type </label><br />
                                            <select
                                                id="motor_type"
                                                name="motor_type"
                                                required
                                                onChange={e => {
                                                    const { value } = e.target;
                                                    formik.setFieldValue("motor_type", value);
                                                    setMotorType(value)
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
                                        :
                                        ""
                                    }
                                    {housing ?
                                        <Col md={6} xs={12}>
                                            <>
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
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
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
                                    <Col md={4} xs={12}>
                                        <label htmlFor="motor_charge">Motor Charge $</label>
                                        <input
                                            id="motor_charge"
                                            name="motor_charge"
                                            value={formik.values.motor_charge}
                                            disabled
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.motor_charge} </p>
                                    </Col>
                                    {motorTube ?
                                        <Col md={4} xs={12}>
                                            <label htmlFor="tube_charge">Tube Charge $</label>
                                            <input
                                                id="tube_charge"
                                                name="tube_charge"
                                                value={(formik.values.tube_charge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                                                disabled
                                            />
                                            <p style={{ color: 'red' }}> {formik.errors.tube_charge} </p>
                                        </Col>
                                        :
                                        ""
                                    }
                                    {housing ?
                                        <Col md={4} xs={12}>
                                            <>
                                                <label htmlFor="housing_charge">Housing Charge $</label>
                                                <input
                                                    id="housing_charge"
                                                    name="housing_charge"
                                                    value={(formik.values.housing_charge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                                                    disabled
                                                />
                                                <p style={{ color: 'red' }}> {formik.errors.housing_charge} </p>
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} xs={12}>
                                <h3>Retention Options</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="retention_type">Retention Type </label>
                                        <select
                                            id="retention_type"
                                            name="retention_type"
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("retention_type", value);
                                                setRetentionType(value)
                                                const basePrice = getRetentionPricing(value);
                                                const additionalPrice = ((unitHeight / 12) * 23.69);
                                                formik.setFieldValue("tracks_charge", basePrice + additionalPrice);
                                            }}>
                                            <option value=''>Select a Rentention Option</option>
                                            <option value='Surface Mount' label='Surface Mount'>Surface Mount </option>
                                            <option value='Recessed' label='Recessed'>Recessed </option>
                                            <option value='Cable Guide' label='Cable Guide'>Cable Guide</option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.retention_type} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        {sideTrack ?
                                            <>
                                                <label htmlFor="retention_cap_color">Retention Cap Color </label><br />
                                                <select
                                                    id="retention_cap_color"
                                                    name="retention_cap_color"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.retention_cap_color}
                                                >
                                                    <option value=''>Select a Cap Color</option>
                                                    <option value='Jet Black' label='Jet Black'>Jet Black </option>
                                                    <option value='Signal White' label='Signal White'>Signal White </option>
                                                    <option value='Urban Gray' label='Urban Gray'>Urban Gray </option>
                                                    <option value='Anthracite' label='Anthracite'>Anthracite </option>
                                                </select>
                                                <p style={{ color: 'red' }}> {formik.errors.motor_side} </p>
                                            </>
                                            :
                                            ""
                                        }
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="tracks_exact_length"
                                                name="tracks_exact_length"
                                                onChange={() => handleToggle('tracks_exact_length')}
                                                value={tracksExactLength}
                                                checked={tracksExactLength}
                                            />
                                            <label htmlFor="tracks_exact_length" style={{ whiteSpace: 'nowrap' }}>Cut Tracks to Exact Length </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                                        <p>(By default, the side tracks are made long, so that you can trim them in the field to exact lengths. Check this box to get tracks pre-cut to length)</p>
                                    </Col>
                                </Row>
                                <Row>
                                    {sideTrack ?
                                        <Col>
                                            <>
                                                <label htmlFor="tracks_charge">Tracks Charge $</label>
                                                <input
                                                    id="tracks_charge"
                                                    name="tracks_charge"
                                                    value={(formik.values.tracks_charge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                                                    disabled
                                                />
                                                <p style={{ color: 'red' }}> {formik.errors.tracks_charge} </p>
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
                                </Row>
                            </Col>
                            {hemBar ?
                                <Col md={6} xs={12}>
                                    <h3>Hem Bar Options</h3>
                                    <Row>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="hem_bar_type">Hem Bar Type </label><br />
                                            <select
                                                id="hem_bar_type"
                                                name="hem_bar_type"
                                                onChange={e => {
                                                    const { value } = e.target;
                                                    formik.setFieldValue("hem_bar_type", value);
                                                    setHemBarType(value)
                                                    const basePrice = getHemBarPricing(value);
                                                    const additionalPrice = ((unitWidth / 12) * 9.65);
                                                    formik.setFieldValue("hem_bar_charge", basePrice + additionalPrice);
                                                }}>
                                                <option value=''>Select a Hem Bar Type</option>
                                                <option value='Tall' label='Tall'>Tall </option>
                                                <option value='Standard' label='Standard'>Standard </option>
                                                <option value='Lanai' label='Lanai'>Lanai </option>
                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar_type} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="hem_cap_color">Hem Bar Cap Color </label><br />
                                            <select
                                                id="hem_cap_color"
                                                name="hem_cap_color"
                                                onChange={formik.handleChange}
                                                value={formik.values.hem_cap_color}
                                            >
                                                <option value=''>Select a Cap Color</option>
                                                <option value='Jet Black' label='Jet Black'>Jet Black </option>
                                                <option value='Signal White' label='Signal White'>Signal White </option>
                                                <option value='Urban Gray' label='Urban Gray'>Urban Gray </option>
                                                <option value='Anthracite' label='Anthracite'>Anthracite </option>
                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_cap_color} </p>
                                        </Col>
                                        <Col>
                                            <label htmlFor="pile_brush_style">Pile Brush Style </label><br />
                                            <select
                                                id="pile_brush_style"
                                                name="pile_brush_style"
                                                onChange={formik.handleChange}
                                                value={formik.values.pile_brush_style}
                                            >
                                                <option value=''>Select a Pile Brush</option>
                                                <option value='1/2 Black' label='1/2 Black'>1/2 Black </option>
                                                <option value='1/2 in White' label='1/2 in White'>1/2 in White </option>
                                                <option value='1/2 in Grey' label='1/2 in Grey'>1/2 in Grey </option>
                                                <option value='3/4 in Black' label='3/4 in Black'>3/4 in Black </option>
                                                <option value='2 in Black' label='2 in Black'>2 in Black </option>
                                                <option value='2 in Black (Double)' label='2 in Black (Double)'>2 in Black (Double) </option>
                                                <option value='None' label='None'>None </option>
                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>
                                        </Col>
                                        <Col>
                                            <label htmlFor="hem_bar_charge">Hem Bar Charge $</label>
                                            <input
                                                id="hem_bar_charge"
                                                name="hem_bar_charge"
                                                value={(formik.values.hem_bar_charge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                                                disabled
                                            />
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar_charge} </p>
                                        </Col>
                                    </Row>
                                </Col>
                                :
                                ""
                            }
                            {fabric ?
                                <Col md={6} xs={12}>
                                    <h3>Fabric Options</h3>
                                    <Row>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="fabric_type">Fabric Type </label><br />
                                            <select
                                                id="fabric_type"
                                                name="fabric_type"
                                                onChange={e => {
                                                    const { value } = e.target;
                                                    formik.setFieldValue("fabric_type", value);
                                                    setFabricType(value)
                                                    const basePrice = getFabricPricing(value);
                                                    const fabric_sqft = ((unitHeight * unitWidth) / 144)
                                                    const additionalPrice = (fabric_sqft * 2.30);
                                                    formik.setFieldValue("fabric_charge", basePrice + additionalPrice);
                                                }}>
                                                <option value=''>Select a Fabric Type</option>
                                                <option value='Twitchell Nano 50' label='Twitchell Nano 50'>Twitchell Nano 50</option>
                                                <option value='Twitchell Nano 55' label='Twitchell Nano 55'>Twitchell Nano 55</option>
                                                <option value='Twitchell Nano 60' label='Twitchell Nano 60'>Twitchell Nano 60</option>
                                                <option value='Twitchell Nano 70' label='Twitchell Nano 70'>Twitchell Nano 70</option>
                                                <option value='Twitchell Nano 95' label='Twitchell Nano 95'>Twitchell Nano 95</option>
                                                <option value='Twitchell Nano 97' label='Twitchell Nano 97'>Twitchell Nano 97</option>
                                                <option value='Twitchell Nano 99' label='Twitchell Nano 99'>Twitchell Nano 99</option>
                                                <option value='Twitchell Dimout' label='Twitchell Dimout'>Twitchell Dimout</option>
                                                <option value='Twitchell Textilene 80' label='Twitchell Textilene 80'>Twitchell Textilene 80</option>
                                                <option value='Twitchell Textilene 90' label='Twitchell Textilene 90'>Twitchell Textilene 90</option>
                                                <option value='Twitchell Textilene 95' label='Twitchell Textilene 95'>Twitchell Textilene 95</option>
                                                <option value='Ferrari Soltis Perform 92' label='Ferrari Soltis Perform 92'>Ferrari Soltis Perform 92</option>
                                                <option value='Ferrari Soltis Opaque B92' label='Ferrari Soltis Opaque B92'>Ferrari Soltis Opaque B92</option>
                                                <option value='Ferrari Soltis Proof' label='Ferrari Soltis Proof'>Ferrari Soltis Proof</option>
                                                <option value='Ferrari Soltis Veozip' label='Ferrari Soltis Veozip'>Ferrari Soltis Veozip</option>
                                                <option value='Ferrari Soltis Horizon' label='Ferrari Soltis Horizon'>Ferrari Soltis Horizon</option>
                                                <option value='Ferrari Harmony' label='Ferrari Harmony'>Ferrari Harmony</option>
                                                <option value='Mermet Natte 3%' label='Mermet Natte 3%'>Mermet Natte 3%</option>
                                                <option value='Mermet Natte 5%' label='Mermet Natte 5%'>Mermet Natte 5%</option>
                                                <option value='Mermet Natte 10%' label='Mermet Natte 10%'>Mermet Natte 10%</option>
                                                <option value='Mermet Satine 1%' label='Mermet Satine 1%'>Mermet Satine 1%</option>
                                                <option value='Mermet Satine 5%' label='Mermet Satine 5%'>Mermet Satine 5%</option>
                                                <option value='Twitchell OmegaTex' label='Twitchell OmegaTex'>Twitchell OmegaTex</option>
                                                <option value='Sunbrella 60 (Solid)' label='Sunbrella 60 (Solid)'>Sunbrella 60 (Solid)</option>

                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar_type} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="fabric_selection">Fabric Selection </label><br />
                                            <select
                                                id="fabric_selection"
                                                name="fabric_selection"
                                                onChange={formik.handleChange}
                                                value={formik.values.fabric_selection}
                                            >
                                                <option value=''>Make your fabric selection</option>
                                                <option value='Black' label='Black'>Black </option>
                                                <option value='White' label='White'>White </option>
                                                <option value='Grey' label='Grey'>Grey </option>
                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.fabric_selection} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="zipper_color">Zipper Color </label><br />
                                            <select
                                                id="zipper_color"
                                                name="zipper_color"
                                                onChange={formik.handleChange}
                                                value={formik.values.zipper_color}
                                            >
                                                <option value=''>Select a Zipper Color</option>
                                                <option value='Black' label='Black'>Black </option>
                                                <option value='White' label='White'>White </option>
                                            </select>
                                            <p style={{ color: 'red' }}> {formik.errors.zipper_color} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <label htmlFor="fabric_charge">Fabric Charge $</label>
                                            <input
                                                id="fabric_charge"
                                                name="fabric_charge"
                                                value={(formik.values.fabric_charge.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                                                disabled
                                            />
                                            <p style={{ color: 'red' }}> {formik.errors.fabric_charge}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                :
                                ""
                            }
                            <Col md={6} xs={12}>
                                <h3>Frame Color</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="color_collection">Color Collection </label><br />
                                        <select
                                            id="color_collection"
                                            name="color_collection"
                                            onChange={formik.handleChange}
                                            value={formik.values.color_collection}
                                        >
                                            <option value=''>Select a Color</option>
                                            <option value='Standard' label='Standard'>Standard </option>
                                            <option value='Textured' label='Textured'>Textured </option>
                                            <option value='Spring' label='Spring'>Spring </option>
                                            <option value='Summer' label='Summer'>Summer </option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>

                                    </Col>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="frame_color">Frame Color </label><br />
                                        <select
                                            id="frame_color"
                                            name="frame_color"
                                            onChange={formik.handleChange}
                                            value={formik.values.frame_color}
                                        >
                                            <option value=''>Select a Frame Color</option>
                                            <option value='White' label='White'>White </option>
                                            <option value='Black' label='Black'>Black </option>
                                            <option value='Bronze' label='Bronze'>Bronze </option>
                                            <option value='Brown' label='Brown'>Brown </option>
                                            <option value='Ash Gray' label='Ash Gray'>Ash Gray </option>
                                        </select>
                                        <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row> */}
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
                                <label htmlFor="list_price" style={{ whiteSpace: 'nowrap' }}>Total Price $ (Without Discount)</label><br />
                                <input
                                    id="list_price"
                                    name="list_price"
                                    onChange={formik.handleChange}
                                    value={(formik.values.list_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
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
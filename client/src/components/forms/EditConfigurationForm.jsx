import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormikContext, useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const EditConfigurationform = () => {

    const { agent, configuration, errors, setErrors } = useContext(AgentContext);
    const { id } = useParams()

    const [completeUnit, setAsCompleteUnit] = useState(configuration.completeUnit)
    const [housing, setHousing] = useState(configuration.housing)
    const [sideTrack, setSideTrack] = useState(configuration.side_track)
    const [hemBar, setHemBar] = useState(configuration.hem_bar)
    const [fabric, setFabric] = useState(configuration.fabric)
    const [motorTube, setMotorTube] = useState(configuration.motor_tube)
    const [motorType, setMotorType] = useState(configuration.motor_type)
    const [unitWidth, setUnitWidth] = useState(configuration.unit_width)
    const [unitHeight, setUnitHeight] = useState(configuration.unit_length)
    const [housingTubeSize, setHousingTubeSize] = useState(configuration.housing_tube_size)
    const [housingType, setHousingType] = useState(configuration.housing_type)
    const [retentionType, setRetentionType] = useState(configuration.retention_type)
    const [tracksExactLength, setTracksExactLength] = useState(configuration.tracks_exact_length)
    const [hemBarType, setHemBarType] = useState(configuration.hem_bar_type)
    const [fabricType, setFabricType] = useState(configuration.fabric_type)
    const [configurations, setConfigurations] = useState([]);

    const handleUpdateConfiguration = (updatedConfiguration) => {
        if (configurations) {
            const updatedConfigurationsArray = configurations.map(configuration => {
                if (configuration.id === updatedConfiguration.id) {
                    return updatedConfiguration;
                }
                return configuration;
            });
            setConfigurations(updatedConfigurationsArray);
            alert(`Configuration ${updatedConfiguration.id} has been updated`);
        } else {
            console.error('Configurations is undefined.');
        }
    }

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
    }, [housing, sideTrack, hemBar, fabric, motorTube])

    const handleCheckboxChange = (event) => {
        if (event.target.id === 'housing') {
            setHousing(event.target.checked);
            formik.setFieldValue('housing', event.target.checked);
        }
        if (event.target.id === 'side_track') {
            setSideTrack(event.target.checked);
            formik.setFieldValue('side_track', event.target.checked)
        }
        if (event.target.id === 'hem_bar') {
            setHemBar(event.target.checked);
            formik.setFieldValue('hem_bar', event.target.checked)
        }
        if (event.target.id === 'fabric') {
            setFabric(event.target.checked);
            formik.setFieldValue('fabric', event.target.checked);
        }
        if (event.target.id === 'motor_tube') {
            setMotorTube(event.target.checked);
            formik.setFieldValue('motor_tube', event.target.checked);
        }
        if (event.target.id === 'tracks_exact_length') {
            setTracksExactLength(event.target.checked);
            formik.setFieldValue('tracks_exact_length', event.target.checked);
        }
    };

    const [originalValues, setOriginalValues] = useState({
        project_name: "",
        unit_name: "",
        complete_unit: "",
        housing: "",
        side_track: "",
        hem_bar: "",
        fabric: "",
        motor_tube: "",
        unit_width: "",
        unit_height: "",
        housing_tube_size: "",
        housing_type: "",
        motor_type: "",
        motor_side: "",
        power_chord: "",
        motor_charge: "",
        tube_charge: "",
        housing_charge: "",
        retention_type: "",
        retention_cap_color: "",
        left_retention: "",
        right_retention: "",
        tracks_exact_length: "",
        tracks_charge: "",
        hem_bar_type: "",
        hem_cap_color: "",
        pile_brush_style: "",
        hem_bar_charge: "",
        fabric_type: "",
        fabric_selection: "",
        seam_location: "",
        seam_location_num: "",
        zipper_color: "",
        usable_fabric_width: "",
        rotate_fabric: "",
        fabric_charge: "",
        color_collection: "",
        frame_color: "",
        powder_charge: "",
        list_price: "",
        quote_id: "",
        created_by: "",
        // status: true,
    });

    useEffect(() => {
        if (configuration) {
            setOriginalValues({
                project_name: `${configuration.project_name}`,
                unit_name: `${configuration.unit_name}`,
                complete_unit: `${configuration.complete_unit}`,
                housing: `${configuration.housing}`,
                side_track: `${configuration.side_track}`,
                hem_bar: `${configuration.hem_bar}`,
                fabric: `${configuration.fabric}`,
                motor_tube: `${configuration.motor_tube}`,
                unit_width: `${configuration.unit_width}`,
                unit_height: `${configuration.unit_height}`,
                housing_tube_size: `${configuration.housing_tube_size}`,
                housing_type: `${configuration.housing_type}`,
                motor_type: `${configuration.motor_type}`,
                motor_side: `${configuration.motor_side}`,
                power_chord: `${configuration.power_chord}`,
                motor_charge: `${configuration.motor_charge}`,
                tube_charge: `${configuration.tube_charge}`,
                housing_charge: `${configuration.housing_charge}`,
                retention_type: `${configuration.retention_type}`,
                retention_cap_color: `${configuration.retention_cap_color}`,
                left_retention: `${configuration.left_retention}`,
                right_retention: `${configuration.right_retention}`,
                tracks_exact_length: `${configuration.tracks_exact_length}`,
                tracks_charge: `${configuration.tracks_charge}`,
                hem_bar_type: `${configuration.hem_bar_type}`,
                hem_cap_color: `${configuration.hem_cap_color}`,
                pile_brush_style: `${configuration.pile_brush_style}`,
                hem_bar_charge: `${configuration.hem_bar_charge}`,
                fabric_type: `${configuration.fabric_type}`,
                fabric_selection: `${configuration.fabric_selection}`,
                seam_location: `${configuration.seam_location}`,
                seam_location_num: `${configuration.seam_location_num}`,
                zipper_color: `${configuration.zipper_color}`,
                usable_fabric_width: `${configuration.usable_fabric_width}`,
                rotate_fabric: `${configuration.rotate_fabric}`,
                fabric_charge: `${configuration.fabric_charge}`,
                color_collection: `${configuration.color_collection}`,
                frame_color: `${configuration.frame_color}`,
                powder_charge: `${configuration.powder_charge}`,
                list_price: `${configuration.list_price}`,
                quote_id: `${configuration.quote.id}`,
                created_by: `${agent.id}`,
                // status: `${configuration.status}`,
                created_at: `${configuration.created_at}`,
                updated_at: configuration.updated_at ? `${configuration.updated_at}` : "",
                updated_by: configuration.updated_by ? `${configuration.updated_by}` : "",
            });
        }
    }, []);

    const formSchema = yup.object().shape({
        project_name: yup.string(),
        unit_name: yup.string(),
        complete_unit: yup.boolean(),
        housing: yup.boolean(),
        side_track: yup.boolean(),
        hem_bar: yup.boolean(),
        fabric: yup.boolean(),
        motor_tube: yup.boolean(),
        unit_width: yup.string(),
        unit_height: yup.string(),
        housing_tube_size: yup.string(),
        housing_type: yup.string(),
        motor_side: yup.string(),
        power_chord: yup.string(),
        motor_charge: yup.string(),
        tube_charge: yup.string(),
        housing_charge: yup.string(),
        retention_type: yup.string(),
        retention_cap_color: yup.string(),
        left_retention: yup.string(),
        right_retention: yup.string(),
        tracks_exact_length: yup.boolean(),
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
        initialValues: originalValues,
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const changes = {};
            Object.keys(values).forEach(key => {
                if (values[key] !== originalValues[key]) {
                    changes[key] = values[key];
                }
            });
            if (Object.keys(changes).length > 1) {
                fetch(`/api/configurations/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(changes),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.errors) {
                            setErrors(data.errors);
                        } else {
                            handleUpdateConfiguration(data);
                            history.go(-1)
                        }
                    });
            }
            else {
                alert('No changes were made to the configuation.')
            }
        }
    })

    useEffect(() => {
        const housingCharge = (housing ? formik.values.housing_charge : 0)
        const motorTubeCharge = (motorTube ? formik.values.tube_charge : 0)
        const sideTrackCharge = (sideTrack ? formik.values.tracks_charge : 0)
        const hemBarCharge = (hemBar ? formik.values.hem_bar_charge : 0)
        const fabricCharge = (fabric ? formik.values.fabric_charge : 0)
        const total = housingCharge + motorTubeCharge + sideTrackCharge + hemBarCharge + fabricCharge + formik.values.motor_charge
        formik.setFieldValue('list_price', total);
    }, [formik.values.motor_charge, formik.values.unit_width, formik.values.unit_height, formik.values.housing_tube_size, formik.values.housing_type, formik.values.retention_type, formik.values.hem_bar_type, formik.values.fabric_type, formik.values.complete_unit, formik.values.housing_charge, formik.values.tracks_charge, formik.hem_bar_charge, formik.values.fabric_charge, formik.values.tube_charge,]);

    return (
        <>
            <Container>
                <div className="account-details">
                    <h2>Edit your Configuration:</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6} xs={12}>
                                <h3>Unit Information</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <Form.Label htmlFor="project_name">Project Name </Form.Label><br />
                                        <Form.Control
                                            id="project_name"
                                            name="project_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_name}
                                            required
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.sku}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Form.Label htmlFor="unit_name">Unit Name </Form.Label><br />
                                        <Form.Control
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
                                            <Form.Check
                                                type="checkbox"
                                                id="complete_unit"
                                                name="complete_unit"
                                                onChange={formik.handleChange}
                                                value={formik.values.complete_unit}
                                                checked={completeUnit}
                                            />
                                            <Form.Label htmlFor="complete_unit" style={{ whiteSpace: 'nowrap' }}>Complete Unit </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="housing"
                                                name="housing"
                                                value={formik.values.housing}
                                                checked={housing}
                                                onChange={(e) => handleCheckboxChange(e)}
                                            />

                                            <Form.Label htmlFor="housing" style={{ whiteSpace: 'nowrap' }}>Housing </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.housing} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="side_track"
                                                name="side_track"
                                                checked={sideTrack}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={formik.values.side_track}
                                            />
                                            <Form.Label htmlFor="side_track" style={{ whiteSpace: 'nowrap' }}>Side Track </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.side_track} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="hem_bar"
                                                name="hem_bar"
                                                checked={hemBar}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={formik.values.hem_bar}
                                            />
                                            <Form.Label htmlFor="hem_bar" style={{ whiteSpace: 'nowrap' }}>Hem Bar </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="fabric"
                                                name="fabric"
                                                checked={fabric}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={formik.values.fabric}
                                            />
                                            <Form.Label htmlFor="fabric" style={{ whiteSpace: 'nowrap' }}>Fabric </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.fabric} </p>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={4}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="motor_tube"
                                                name="motor_tube"
                                                checked={motorTube}
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={formik.values.motor_tube}
                                            />
                                            <Form.Label htmlFor="motor_tube" style={{ whiteSpace: 'nowrap' }}>Motor Tube </Form.Label>
                                            <p style={{ color: 'red' }}> {formik.errors.motor_tube} </p>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} xs={12}>
                                <h3>Unit Size</h3>
                                <Form.Label htmlFor="unit_width">Unit Width </Form.Label>
                                <Form.Control
                                    id="unit_width"
                                    name="unit_width"
                                    required
                                    value={formik.values.unit_width}
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.setFieldValue("unit_width", value);
                                        setUnitWidth(value)
                                        formik.setFieldValue("tube_charge", ((value / 12) * 20.66) + get_tube_price(housingTubeSize))
                                        formik.setFieldValue("housing_charge", ((value / 12) * 30.21) + get_housing_price(housingType, housingTubeSize));
                                        formik.setFieldValue("hem_bar_charge", ((value / 12) * 12) + getHemBarPricing(hemBarType))
                                        formik.setFieldValue("fabric_charge", (((value * formik.values.unit_height) / 144) * 2.83) + getFabricPricing(fabricType))
                                    }} />
                                <p style={{ color: 'red' }}> {formik.errors.unit_width} </p>
                                <Form.Label htmlFor="unit_height">Unit Height </Form.Label>
                                <Form.Control
                                    id="unit_height"
                                    name="unit_height"
                                    required
                                    value={formik.values.unit_height}
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.setFieldValue("unit_height", value);
                                        setUnitHeight(value)
                                        formik.setFieldValue("tracks_charge", ((value / 12) * 23.69) + getRetentionPricing(retentionType))
                                        formik.setFieldValue("housing_charge", ((value / 12) * 30.21) + get_housing_price(housingType, housingTubeSize));
                                        formik.setFieldValue("fabric_charge", (((value * formik.values.unit_width) / 144) * 2.83) + getFabricPricing(fabricType))
                                    }} />
                                <p style={{ color: 'red' }}> {formik.errors.unit_height} </p>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Housing & Motor Options</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <Form.Label htmlFor="housing_tube_size">Housing & Tube Size </Form.Label>
                                        <Form.Select
                                            id="housing_tube_size"
                                            name="housing_tube_size"
                                            value={formik.values.housing_tube_size}
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("housing_tube_size", value);
                                                setHousingTubeSize(value)
                                                const basePrice = get_tube_price(value);
                                                const additionalPrice = ((formik.values.unit_width / 12) * 20.66);
                                                formik.setFieldValue("tube_charge", basePrice + additionalPrice);
                                                formik.setFieldValue("housing_charge", ((formik.values.unit_width / 12) * 30.21) + get_housing_price(housingType, value))
                                            }}
                                            required
                                        >
                                            <option value=''>Select a Housing & Tube Size </option><br />
                                            <option value='Standard(4.5")' label='Standard(4.5")'>Standard(4.5") </option>
                                            <option value='Jumbo(5.75")' label='Jumbo(5.75")'>Jumbo(5.75") </option>
                                            <option value='Micro(3.5")' label='Micro(3.5")' >Micro(3.5") </option>
                                        </Form.Select>
                                        <p style={{ color: 'red' }}> {formik.errors.housing_tube_size} </p>
                                    </Col>
                                    {housing ?
                                        <Col md={6} xs={12}>
                                            <>
                                                <Form.Label htmlFor="housing_type">Housing Type </Form.Label><br />
                                                <Form.Select
                                                    id="housing_type"
                                                    name="housing_type"
                                                    value={formik.values.housing_type}
                                                    onChange={e => {
                                                        const { value } = e.target;
                                                        formik.setFieldValue("housing_type", value);
                                                        setHousingType(value)
                                                        const basePrice = get_housing_price(value, housingTubeSize);
                                                        const additionalPrice = ((formik.values.unit_width / 12) * 30.21);
                                                        formik.setFieldValue("housing_charge", basePrice + additionalPrice);
                                                    }}
                                                    required
                                                >
                                                    <option value=''>Select a Housing Type </option>
                                                    <option value='Complete' label='Complete'>Complete </option>
                                                    <option value='Housing Base(no cover)' label='Housing Base(no cover)'>Housing Base(no cover) </option>
                                                    <option value='Open Mount Brackets' label='Open Mount Brackets'>Open Mount Brackets </option>
                                                </Form.Select>
                                                <p style={{ color: 'red' }}> {formik.errors.housing_type} </p>
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
                                    {motorTube ?
                                        <Col md={6} xs={12}>
                                            <Form.Label htmlFor="motor_type">Motor Type </Form.Label><br />
                                            <Form.Select
                                                id="motor_type"
                                                name="motor_type"
                                                value={formik.values.motor_type}
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
                                                <option value='Somfy Autosun' label='Somfy Autosun' disabled>Somfy Autosun</option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.motor_type} </p>
                                        </Col>
                                        :
                                        ""
                                    }
                                    {housing ?
                                        <Col md={6} xs={12}>
                                            <>
                                                <Form.Label htmlFor="motor_side">Motor Side </Form.Label><br />
                                                <Form.Select
                                                    id="motor_side"
                                                    name="motor_side"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.motor_side}
                                                    required
                                                >
                                                    <option value=''>Select a Motor Side</option>
                                                    <option value='Left' label='Left'>Left </option>
                                                    <option value='Right' label='Right'>Right </option>

                                                </Form.Select>
                                                <p style={{ color: 'red' }}> {formik.errors.motor_side} </p>
                                            </>
                                        </Col>
                                        :
                                        ""
                                    }
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label htmlFor="power_chord">Power Chord </Form.Label>
                                        <Form.Select
                                            id="power_chord"
                                            name="power_chord"
                                            value={formik.values.power_chord}
                                            required
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("power_chord", value);
                                                const motorTypePrice = get_motor_charge(motorType);
                                                const powerChordPrice = get_power_chord_price(value);
                                                formik.setFieldValue("motor_charge", motorTypePrice + powerChordPrice);
                                            }}>
                                            <option value=''>Select a Power Chord</option>
                                            <option value='6ft with pigtail(Alpha)' label='6ft with pigtail(Alpha)'>6ft with pigtail(Alpha) </option>
                                            <option value='32ft with pigtail(Alpha)' label='32ft with pigtail(Alpha)'>32ft with pigtail(Alpha) </option>
                                            <option value='30ft BLACK with molded plug (Alpha)' label='30ft BLACK with molded plug (Alpha)'>30ft BLACK with molded plug (Alpha)</option>
                                        </Form.Select>
                                        <p style={{ color: 'red' }}> {formik.errors.power_chord} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} xs={12}>
                                        <Form.Label htmlFor="motor_charge">Motor Charge $</Form.Label>
                                        <Form.Control
                                            id="motor_charge"
                                            name="motor_charge"
                                            value={parseFloat(formik.values.motor_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            disabled
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.motor_charge} </p>
                                    </Col>
                                    {motorTube ?
                                        <Col md={4} xs={12}>
                                            <Form.Label htmlFor="tube_charge">Tube Charge $</Form.Label>
                                            <Form.Control
                                                id="tube_charge"
                                                name="tube_charge"
                                                value={parseFloat(formik.values.tube_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <Form.Label htmlFor="housing_charge">Housing Charge $</Form.Label>
                                                <Form.Control
                                                    id="housing_charge"
                                                    name="housing_charge"
                                                    value={parseFloat(formik.values.housing_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                        <Form.Label htmlFor="retention_type">Retention Type </Form.Label>
                                        <Form.Select
                                            id="retention_type"
                                            name="retention_type"
                                            value={formik.values.retention_type}
                                            required
                                            onChange={e => {
                                                const { value } = e.target;
                                                formik.setFieldValue("retention_type", value);
                                                setRetentionType(value)
                                                const basePrice = getRetentionPricing(value);
                                                const additionalPrice = ((formik.values.unit_height / 12) * 23.69);
                                                formik.setFieldValue("tracks_charge", basePrice + additionalPrice);
                                            }}>
                                            <option value=''>Select a Rentention Option</option>
                                            <option value='Surface Mount' label='Surface Mount'>Surface Mount </option>
                                            <option value='Recessed' label='Recessed'>Recessed </option>
                                            <option value='Cable Guide' label='Cable Guide'>Cable Guide</option>
                                        </Form.Select>
                                        <p style={{ color: 'red' }}> {formik.errors.retention_type} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        {sideTrack ?
                                            <>
                                                <Form.Label htmlFor="retention_cap_color">Retention Cap Color </Form.Label><br />
                                                <Form.Select
                                                    id="retention_cap_color"
                                                    name="retention_cap_color"
                                                    onChange={formik.handleChange}
                                                    required
                                                    value={formik.values.retention_cap_color}
                                                >
                                                    <option value=''>Select a Cap Color</option>
                                                    <option value='Jet Black' label='Jet Black'>Jet Black </option>
                                                    <option value='Signal White' label='Signal White'>Signal White </option>
                                                    <option value='Urban Gray' label='Urban Gray'>Urban Gray </option>
                                                    <option value='Anthracite' label='Anthracite'>Anthracite </option>
                                                </Form.Select>
                                                <p style={{ color: 'red' }}> {formik.errors.motor_side} </p>
                                            </>
                                            :
                                            ""
                                        }
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-check d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="tracks_exact_length"
                                                name="tracks_exact_length"
                                                value={formik.values.tracks_exact_length}
                                                checked={tracksExactLength}
                                                onChange={(e) => handleCheckboxChange(e)}
                                            />
                                            <Form.Label htmlFor="tracks_exact_length" style={{ whiteSpace: 'nowrap' }}>Cut Tracks to Exact Length </Form.Label>
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
                                                <Form.Label htmlFor="tracks_charge">Tracks Charge $</Form.Label>
                                                <Form.Control
                                                    id="tracks_charge"
                                                    name="tracks_charge"
                                                    value={parseFloat(formik.values.tracks_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            <Form.Label htmlFor="hem_bar_type">Hem Bar Type </Form.Label><br />
                                            <Form.Select
                                                id="hem_bar_type"
                                                name="hem_bar_type"
                                                value={formik.values.hem_bar_type}
                                                required
                                                onChange={e => {
                                                    const { value } = e.target;
                                                    formik.setFieldValue("hem_bar_type", value);
                                                    setHemBarType(value)
                                                    const basePrice = getHemBarPricing(value);
                                                    const additionalPrice = ((formik.values.unit_width / 12) * 9.65);
                                                    formik.setFieldValue("hem_bar_charge", basePrice + additionalPrice);
                                                }}>
                                                <option value=''>Select a Hem Bar Type</option>
                                                <option value='Tall' label='Tall'>Tall </option>
                                                <option value='Standard' label='Standard'>Standard </option>
                                                <option value='Lanai' label='Lanai'>Lanai </option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar_type} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Label htmlFor="hem_cap_color">Hem Bar Cap Color </Form.Label><br />
                                            <Form.Select
                                                id="hem_cap_color"
                                                name="hem_cap_color"
                                                onChange={formik.handleChange}
                                                value={formik.values.hem_cap_color}
                                                required
                                            >
                                                <option value=''>Select a Cap Color</option>
                                                <option value='Jet Black' label='Jet Black'>Jet Black </option>
                                                <option value='Signal White' label='Signal White'>Signal White </option>
                                                <option value='Urban Gray' label='Urban Gray'>Urban Gray </option>
                                                <option value='Anthracite' label='Anthracite'>Anthracite </option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_cap_color} </p>
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="pile_brush_style">Pile Brush Style </Form.Label><br />
                                            <Form.Select
                                                id="pile_brush_style"
                                                name="pile_brush_style"
                                                onChange={formik.handleChange}
                                                value={formik.values.pile_brush_style}
                                                required
                                            >
                                                <option value=''>Select a Pile Brush</option>
                                                <option value='1/2 Black' label='1/2 Black'>1/2 Black </option>
                                                <option value='1/2 in White' label='1/2 in White'>1/2 in White </option>
                                                <option value='1/2 in Grey' label='1/2 in Grey'>1/2 in Grey </option>
                                                <option value='3/4 in Black' label='3/4 in Black'>3/4 in Black </option>
                                                <option value='2 in Black' label='2 in Black'>2 in Black </option>
                                                <option value='2 in Black (Double)' label='2 in Black (Double)'>2 in Black (Double) </option>
                                                <option value='None' label='None'>None </option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="hem_bar_charge">Hem Bar Charge $</Form.Label>
                                            <Form.Control
                                                id="hem_bar_charge"
                                                name="hem_bar_charge"
                                                value={parseFloat(formik.values.hem_bar_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            <Form.Label htmlFor="fabric_type">Fabric Type </Form.Label><br />
                                            <Form.Select
                                                id="fabric_type"
                                                name="fabric_type"
                                                value={formik.values.fabric_type}
                                                required
                                                onChange={e => {
                                                    const { value } = e.target;
                                                    formik.setFieldValue("fabric_type", value);
                                                    setFabricType(value)
                                                    const basePrice = getFabricPricing(value);
                                                    const fabric_sqft = ((formik.values.unit_height * formik.values.unit_width) / 144)
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

                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.hem_bar_type} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Label htmlFor="fabric_selection">Fabric Selection </Form.Label><br />
                                            <Form.Select
                                                id="fabric_selection"
                                                name="fabric_selection"
                                                onChange={formik.handleChange}
                                                value={formik.values.fabric_selection}
                                                required
                                            >
                                                <option value=''>Make your fabric selection</option>
                                                <option value='Black' label='Black'>Black </option>
                                                <option value='White' label='White'>White </option>
                                                <option value='Grey' label='Grey'>Grey </option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.fabric_selection} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Label htmlFor="zipper_color">Zipper Color </Form.Label><br />
                                            <Form.Select
                                                id="zipper_color"
                                                name="zipper_color"
                                                onChange={formik.handleChange}
                                                value={formik.values.zipper_color}
                                                required
                                            >
                                                <option value=''>Select a Zipper Color</option>
                                                <option value='Black' label='Black'>Black </option>
                                                <option value='White' label='White'>White </option>
                                            </Form.Select>
                                            <p style={{ color: 'red' }}> {formik.errors.zipper_color} </p>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Label htmlFor="fabric_charge">Fabric Charge $</Form.Label>
                                            <Form.Control
                                                id="fabric_charge"
                                                name="fabric_charge"
                                                value={parseFloat(formik.values.fabric_charge, 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                        <Form.Label htmlFor="color_collection">Color Collection </Form.Label><br />
                                        <Form.Select
                                            id="color_collection"
                                            name="color_collection"
                                            onChange={formik.handleChange}
                                            value={formik.values.color_collection}
                                            required
                                        >
                                            <option value=''>Select a Color</option>
                                            <option value='Standard' label='Standard'>Standard </option>
                                            <option value='Textured' label='Textured'>Textured </option>
                                            <option value='Spring' label='Spring'>Spring </option>
                                            <option value='Summer' label='Summer'>Summer </option>
                                        </Form.Select>
                                        <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>

                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Form.Label htmlFor="frame_color">Frame Color </Form.Label><br />
                                        <Form.Select
                                            id="frame_color"
                                            name="frame_color"
                                            onChange={formik.handleChange}
                                            value={formik.values.frame_color}
                                            required
                                        >
                                            <option value=''>Select a Frame Color</option>
                                            <option value='White' label='White'>White </option>
                                            <option value='Black' label='Black'>Black </option>
                                            <option value='Bronze' label='Bronze'>Bronze </option>
                                            <option value='Brown' label='Brown'>Brown </option>
                                            <option value='Ash Gray' label='Ash Gray'>Ash Gray </option>
                                        </Form.Select>
                                        <p style={{ color: 'red' }}> {formik.errors.pile_brush_style} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}></Col>
                            <Col md={6} xs={12}>
                                <Form.Label htmlFor="list_price" style={{ whiteSpace: 'nowrap' }}>Total Price $ (Without Discount)</Form.Label><br />
                                <Form.Control
                                    id="list_price"
                                    name="list_price"
                                    disabled
                                    onChange={formik.handleChange}
                                    value={formik.values.list_price}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.list_price}</p>
                            </Col>
                        </Row>
                        <hr />
                        <div className="d-flex justify-content-end gap-2">
                            <p><Button variant='primary' type="submit">Save Changes</Button></p>
                            <p className="view-btn" title="Cancel Edit" onClick={() => history.go(-1)}> Cancel </p>
                        </div>
                    </Form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                </div>
            </Container >
        </>
    )
}

export default EditConfigurationform;
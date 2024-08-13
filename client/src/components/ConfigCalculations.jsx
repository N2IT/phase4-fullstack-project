const Calculations = () => {

    const get_motor_charge = (motor_type) => {
        if (motor_type == 'Alpha pro+OD')
            s.motor_type_price = 0
        if (motor_type == 'Somfy RTS' || motor_type == 'Somfy Hardwired')
            s.motor_type_price = 300
        if (motor_type == 'Somfy Autosun')
            s.motor_type_price = 600
        return s.motor_type_price
    }

}



export default Calculations
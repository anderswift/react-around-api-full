function FormField(props) {

  return (
    <>
      <input 
        type={props.type === undefined ? 'text' : props.type} 
        name={props.name}
        id={props.name} 
        className={`form__input${props.isModal ? ' modal__input' : ''}${props.error ? ' form__input_type_error': ''}`} 
        aria-label={props.label} 
        placeholder={props.label} 
        minLength={props.minMax ? props.minMax[0] : undefined}
        maxLength={props.minMax ? props.minMax[1] : undefined} 
        value={props.value} 
        onChange={props.handleChange}
        autoComplete={props.type === 'password' ? `around-the-us ${props.name}` : ''}
        required />
      <span className={`form__error${props.error ? ' form__error_active' : ''}`}>{props.error}</span>
    </>
  );
}

export default FormField;

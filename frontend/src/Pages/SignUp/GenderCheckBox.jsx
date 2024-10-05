


const GenderCheckBox = ({checkboxValue, handleChangeCheckbox}) => {
  return (
    <div className="flex">
        <div className="form-control">
            <label htmlFor="male" className="label gap-2 cursor-pointer">
             <span className={`label-text ${checkboxValue === 'male' ? 'selected' : ''}`}>Male</span>
             <input type="checkbox" id="male" className="checkbox border-slate-900" value={checkboxValue}  onChange={()=>handleChangeCheckbox('male')} checked={checkboxValue === "male"} />

            </label>
        </div>
        <div className="form-control">
            <label htmlFor="female" className="label gap-2 cursor-pointer">
             <span className={`label-text ${checkboxValue === 'female' ? 'selected' : ''}`}>Female</span>
             <input type="checkbox" id="female" className="checkbox border-slate-900" value={checkboxValue}  onChange={()=>handleChangeCheckbox('female')} checked={checkboxValue === "female"} />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox
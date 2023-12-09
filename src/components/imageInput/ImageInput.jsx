const ImageInput = ({onChange, multiple,  ...props}) => {
    return ( 
        <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            onChange={onChange}
            multiple={multiple}
            {...props}
          />
     );
}
 
export default ImageInput;
import './Button.css'

const Button = (props) => {
  return (
    <div className="buttons">
      <button className="button">
        {props.content}
      </button>
    </div>
  );
};

export default Button;

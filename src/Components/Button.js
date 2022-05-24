import './Button.scss'

const Button = (props) => {
  return (
    <div>
      <button className="button">
        {props.content}
      </button>
    </div>
  );
};

export default Button;

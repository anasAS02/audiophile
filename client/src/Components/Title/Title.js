import "./title.css";

export default function Title(props){
    return(
        <div className="title">
            <h1>{props.name}</h1>
        </div>
    )
}
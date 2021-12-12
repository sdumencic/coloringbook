import "./Images.scss";
import Image from "./Image/Image";

const Images = () => {
    const IMAGE = "/images/parrot.png";

    return (
        <div className="images-container row row-cols-md-3 g-4">
            <div className="col">
                <div className="card">
                    <img src={IMAGE} className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">Papiga</h5>
                    {/* <p className ="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p> */}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src={IMAGE} className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">Papiga</h5>
                    {/* <p className ="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p> */}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src={IMAGE} className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">Papiga</h5>
                    {/* <p className ="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p> */}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src={IMAGE} className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">Papiga</h5>
                    {/* <p className ="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Images;
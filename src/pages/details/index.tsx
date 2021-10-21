import React, { Component } from "react";

class Details extends Component {
  render() {
    return(
      <div className="details-content">
        <div className="row">
          <div className="offset-md-2 col-md-4 text-center details-card-left">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" className="details-img" />
          </div>
          <div className="col-md-4 details-card-right">
            <div className="details-card-title">Bulbasaur</div>
            <div className="row">
              <div className="col-4 font-weight-bold">Attack</div>
              <div className="col-1 font-weight-bold">45</div>
              <div className="offset-1 col-4 font-weight-bold">Defense</div>
              <div className="col-1 font-weight-bold">45</div>
            </div>
            <div className="row">
              <div className="col-4 font-weight-bold">HP</div>
              <div className="col-1 font-weight-bold">45</div>
              <div className="offset-1 col-4 font-weight-bold">Speed</div>
              <div className="col-1 font-weight-bold">45</div>
            </div>
            <div className="row">
              <div className="col-4 font-weight-bold">Special Attack</div>
              <div className="col-1 font-weight-bold">45</div>
              <div className="offset-1 col-4 font-weight-bold">Special Defense</div>
              <div className="col-1 font-weight-bold">45</div>
            </div>
            <div className="card-title mt-2">Type</div>
            <div>
              <span className="badge bg-normal mx-1">Normal</span>
              <span className="badge bg-fighting mx-1">Fighting</span>
              <span className="badge bg-flying mx-1">Flying</span>
              <span className="badge bg-poison mx-1">Poison</span>
              <span className="badge bg-ground mx-1">Ground</span>
              <span className="badge bg-rock mx-1">Rock</span>
              <span className="badge bg-bug mx-1">Bug</span>
              <span className="badge bg-ghost mx-1">Ghost</span>
              <span className="badge bg-steel mx-1">Steel</span>
              <span className="badge bg-fire mx-1">Fire</span>
              <span className="badge bg-water mx-1">Water</span>
              <span className="badge bg-grass mx-1">Grass</span>
              <span className="badge bg-physic mx-1">Physic</span>
              <span className="badge bg-ice mx-1">Ice</span>
              <span className="badge bg-dragon mx-1">Dragon</span>
              <span className="badge bg-dark mx-1">Dark</span>
              <span className="badge bg-fairy mx-1">Fairy</span>
            </div>
            <div className="card-title mt-2">Weakness</div>
            <div>
              <span className="badge bg-normal mx-1">Normal</span>
              <span className="badge bg-fighting mx-1">Fighting</span>
              <span className="badge bg-flying mx-1">Flying</span>
              <span className="badge bg-poison mx-1">Poison</span>
              <span className="badge bg-ground mx-1">Ground</span>
              <span className="badge bg-rock mx-1">Rock</span>
              <span className="badge bg-bug mx-1">Bug</span>
              <span className="badge bg-ghost mx-1">Ghost</span>
              <span className="badge bg-steel mx-1">Steel</span>
              <span className="badge bg-fire mx-1">Fire</span>
              <span className="badge bg-water mx-1">Water</span>
              <span className="badge bg-grass mx-1">Grass</span>
              <span className="badge bg-physic mx-1">Physic</span>
              <span className="badge bg-ice mx-1">Ice</span>
              <span className="badge bg-dragon mx-1">Dragon</span>
              <span className="badge bg-dark mx-1">Dark</span>
              <span className="badge bg-fairy mx-1">Fairy</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
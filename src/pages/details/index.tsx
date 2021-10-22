import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BASE_URL_IMG } from "../../config";
import { ucfirst } from "../../Helper";
import * as PokemonDataSource from "../../api/PokemonSource";
import { IPokemon } from "../../interfaces/IPokemon";
import { IPokemonTypesResults } from "../../interfaces/IApiResults";

interface IDetailsProps extends RouteComponentProps {
  pokemonID: number
};

interface IDetailsState {
  id: number,
  isLoading: boolean,
  pokemonData: IPokemon
};

class Details extends Component<IDetailsProps, IDetailsState> {
  constructor(props: IDetailsProps) {
    super(props);

    this.state = {
      id: props.pokemonID,
      isLoading: true,
      pokemonData: {
        id: 0,
        name: ""
      },
    };
  }

  componentDidMount() {
    console.log("pokemonID", this.state.id);
    if(this.state.id == 0) {
      // show modal
    } else {
      this.fetchPokemonDetails();
    }
  }

  fetchPokemonDetails = () => {
    let pokemonDetails: IPokemon = {
      id: this.state.id,
      name: "",
      imgURL: BASE_URL_IMG + this.state.id + ".png",
    };

    PokemonDataSource.fetchPokemonDetails(this.state.id)
      .then((response: any) => {
        if(response.status == 200) {
          if(response.data != null) {
            let result = response.data;
            let stats = response.data.stats;
            let types = response.data.types;
            console.log("types", types);

            pokemonDetails.padID = String(this.state.id).padStart(3, "0");
            pokemonDetails.name = ucfirst(result.name);
            pokemonDetails.stats = {
              hp: stats[0].base_stat,
              attack: stats[1].base_stat,
              defense: stats[2].base_stat,
              specialAttack: stats[3].base_stat,
              specialDefense: stats[4].base_stat,
              speed: stats[5].base_stat,
            };
            pokemonDetails.height = result.height;
            pokemonDetails.weight = result.weight;
            
            pokemonDetails.type = [];
            types.map((data: IPokemonTypesResults, index: number) => {
              pokemonDetails.type?.push(data.type.name.toLowerCase());
            });

            console.log("pokemonDetails", pokemonDetails);
          }
        } else {
          // show modal
        }
      })
      .catch((ex) => {
        // show modal
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          pokemonData: pokemonDetails
        });
      });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return(
      <div className="details-content">
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-secondary" onClick={() => this.goBack()}>
              <i className="fas fa-angle-left me-2"></i>
              Back
            </button>
          </div>
          <div className="col-md-4 text-center details-card-left">
            <img src={this.state.pokemonData.imgURL} className="details-img" />
          </div>
          <div className="col-md-4 details-card-right">
            <div className="details-card-title">
              {this.state.pokemonData.name}
              <span className="details-card-subtitle ms-2">{"#" + this.state.pokemonData.padID}</span>
            </div>
            <div className="row mt-4">
              <div className="col-4 font-weight-bold">Weight</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.weight}</div>
              <div className="offset-1 col-4 font-weight-bold">Height</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.height}</div>
            </div>
            <div className="row">
              <div className="col-4 font-weight-bold">Attack</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.attack}</div>
              <div className="offset-1 col-4 font-weight-bold">Defense</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.defense}</div>
            </div>
            <div className="row">
              <div className="col-4 font-weight-bold">HP</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.hp}</div>
              <div className="offset-1 col-4 font-weight-bold">Speed</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.speed}</div>
            </div>
            <div className="row">
              <div className="col-4 font-weight-bold">Special Attack</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.specialAttack}</div>
              <div className="offset-1 col-4 font-weight-bold">Special Defense</div>
              <div className="col-1 font-weight-bold">{this.state.pokemonData.stats?.specialDefense}</div>
            </div>
            <div className="card-title mt-3">Type</div>
            <div>
              {
                this.state.pokemonData.type?.map((data: any, index: number) => {
                  return (
                    <span className={"badge bg-" + data + " mx-1"}>{ucfirst(data)}</span>
                  );
                })
              }
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IDetailsProps) => {
  return {
    pokemonID: state.pokemonID
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Details));
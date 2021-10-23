import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { searchPokemon, savePokemonID } from "../../redux";
import { MAX_POKEMON } from "../../config";

import { IPokemon } from "../../interfaces/IPokemon";
import { ISearchParam } from "../../interfaces/IParameter";

import Sidebar from "../../components/Sidebar";
import CustomModal from "../../components/Modal";
import HomeSkeleton from "./HomeSkeleton";

interface IHomeProps extends RouteComponentProps {
  isLoading: boolean,
  listPokemon: IPokemon[],
  showModal: boolean,
  search: ISearchParam,
  searchPokemon(param: ISearchParam): any,
  savePokemonID(payload: number): any,
};

interface IHomeState {
  isLoading: boolean,
  listPokemon: IPokemon[],
  showModal: boolean,
  search: ISearchParam,
};

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      isLoading: true,
      listPokemon: [],
      showModal: false,
      search: {
        keyword: "",
        types: [],
        page: 1,
      },
    };
  }

  componentDidMount() {
    let param: ISearchParam = {
      keyword: "",
      types: [],
      page: 1
    };

    this.props.searchPokemon(param);
  }

  loadMore = () => {
    let param: ISearchParam = {
      keyword: this.props.search.keyword,
      types: this.props.search.types,
      page: this.props.search.page + 1
    };

    this.props.searchPokemon(param);
  }

  redirectToDetails = (id: number) => {
    this.props.savePokemonID(id);
    this.props.history.push("/details");
  }

  render() {
    let showLoadMore: boolean = false;
    if(!this.props.isLoading
      && this.props.listPokemon.length > 0
      && this.props.listPokemon.length % MAX_POKEMON == 0
    ) {
      showLoadMore = true;
    }

    return (
      <React.Fragment>
        <Sidebar />

        <div className="content">
          <CustomModal showModal={this.props.showModal} />

          {this.props.isLoading && 
            <HomeSkeleton />
          }

          {!this.props.isLoading && this.props.listPokemon.length == 0 && "Pokemon not found!"}

          {!this.props.isLoading && this.props.listPokemon.length > 0 &&
            <div className="row">
              {
                this.props.listPokemon.map((data: IPokemon, index: number) => {
                  return (
                    <div className="col-md-4 col-12 card-wrapper" key={"pokemon-" + data.id}>
                      <div className="card-content" onClick={() => this.redirectToDetails(data.id)}>
                        <div className="card-img">
                          <img src={data.imgURL} width="100%" />
                        </div>
                        <div className="card-title">
                          {data.name}
                        </div>
                      </div>
                    </div>
                  );
                })}

            {showLoadMore &&
              <button className="btn btn-block btn-primary mx-2" onClick={() => this.loadMore()}>Load More</button>
            }
            </div>
          }
        </div>
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state: IHomeState) => {
  return {
    isLoading: state.isLoading,
    listPokemon: state.listPokemon,
    showModal: state.showModal,
    search: state.search,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchPokemon: (param: ISearchParam) => dispatch(searchPokemon(param)),
    savePokemonID: (payload: number) => dispatch(savePokemonID(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Home));
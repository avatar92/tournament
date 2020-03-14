import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getEquipes } from "../../actions/equipeAction";
import { addMatch } from "../../actions/matchAction";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipeAMatchA: {},
      equipeBMatchA: {},
      equipeAMatchB: {},
      equipeBMatchB: {},
      draggedEquipe: {},
      tournois: [],
      MatchA: {},
      MatchB: {}
    };
  }
  componentDidMount() {
    this.props.getEquipes();
  }

  onDrag = (event, equipe) => {
    event.preventDefault();
    this.setState({
      draggedEquipe: equipe
    });
  };
  onDragOverAA = event => {
    event.preventDefault();
  };
  onDropAA = event => {
    event.preventDefault();
    const { draggedEquipe } = this.state;
    const { equipes } = this.props;
    this.setState({
      equipeAMatchA: draggedEquipe,
      equipes: equipes.filter(equipe => equipe._id !== draggedEquipe._id),
      draggedTask: {}
    });
  };
  onDragOverBA = event => {
    event.preventDefault();
  };
  onDropBA = event => {
    event.preventDefault();
    const { draggedEquipe } = this.state;
    const { equipes } = this.props;
    this.setState({
      equipeBMatchA: draggedEquipe,
      equipes: equipes.filter(equipe => equipe._id !== draggedEquipe._id),
      draggedTask: {}
    });
  };
  onDragOverAB = event => {
    event.preventDefault();
  };
  onDropAB = event => {
    event.preventDefault();
    const { draggedEquipe } = this.state;
    const { equipes } = this.props;
    this.setState({
      equipeAMatchB: draggedEquipe,
      equipes: equipes.filter(equipe => equipe._id !== draggedEquipe._id),
      draggedTask: {}
    });
  };
  onDragOverBB = event => {
    event.preventDefault();
  };
  onDropBB = event => {
    event.preventDefault();
    const { draggedEquipe } = this.state;
    const { equipes } = this.props;
    this.setState({
      equipeBMatchB: draggedEquipe,
      equipes: equipes.filter(equipe => equipe._id !== draggedEquipe._id),
      draggedTask: {}
    });
  };
  onSubmitMatch1 = e => {
    e.preventDefault();
    const equipeAMatchAId = this.state.equipeAMatchA._id;
    const equipeBMatchAId = this.state.equipeBMatchA._id;
    const match1Title = "match1";
    this.setState({
      MatchA: { equipeAMatchAId, equipeBMatchAId, match1Title }
    });
    console.log("ids", equipeAMatchAId, equipeBMatchAId);
    const title = match1Title;
    axios
      .post({
        baseURL:`http://localhost:5000/api/match/${equipeAMatchAId}/${equipeBMatchAId}`,
        data:{
          title
        }
      })
      
  
  };
  onSubmitMatch2 = e => {
    e.preventDefault();
    const equipeAMatchBId = this.state.equipeAMatchB._id;
    const equipeBMatchBId = this.state.equipeBMatchB._id;
    const match2Title = "match2";
    this.setState({
      MatchB: { equipeAMatchBId, equipeBMatchBId, match2Title }
    });
    addMatch(equipeAMatchBId, equipeBMatchBId, match2Title);
  };
  render() {
    // console.log(MatchA, MatchB);
    // console.log("when rendering",this.props.equipes)
    if (this.props.equipes.length === 0) {
      return <div>Loading ........</div>;
    }

    const { equipes } = this.props;
    return (
      <div className="homepage-container container">
        <div className="row">
          {/**Drag league */}
          <div className="equipe-container col-12">
            <div className="row">
              {equipes.map(equipe => (
                <div
                  className="col-3"
                  key={equipe._id}
                  draggable
                  onDrag={e => this.onDrag(e, equipe)}
                >
                  <div className="btn btn-danger">{equipe.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="Matchs-container col-12 mt-5">
            {/**drop in match A */}
            <div className="matchAContainer">
              <h1 className="p-2 ml-auto">Match1 :</h1>
              <form
                className="matchASubmit form d-flex mr-auto"
                onSubmit={e => this.onSubmitMatch1(e)}
              >
                <div className="fieldOne">
                  {Object.keys(this.state.equipeAMatchA).length === 0 ? (
                    <div className="drop-equipeAMatchA bg-light">
                      <div
                        className="p-4"
                        onDrop={event => this.onDropAA(event)}
                        onDragOver={event => this.onDragOverAA(event)}
                      >
                        Drop Something
                      </div>
                    </div>
                  ) : (
                    <div className="btn btn-danger">
                      {this.state.equipeAMatchA.title}
                    </div>
                  )}

                  <input
                    value={this.state.equipeAMatchA.title}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="fieldTwo">
                  {Object.keys(this.state.equipeBMatchA).length === 0 ? (
                    <div className="drop-equipebBMatchA bg-light">
                      <div
                        className="p-4"
                        onDrop={event => this.onDropBA(event)}
                        onDragOver={event => this.onDragOverBA(event)}
                      >
                        Drop Something
                      </div>
                    </div>
                  ) : (
                    <div className="btn btn-danger ml-2">
                      {this.state.equipeBMatchA.title}
                    </div>
                  )}

                  <input
                    value={this.state.equipeBMatchA.title}
                    style={{ display: "none" }}
                  />
                </div>
                <input
                  className="btn btn-secondary ml-3"
                  type="submit"
                  value="submit"
                />
              </form>
            </div>
            {/**drop in match B */}
            <div className="matchBContainer">
              <h1 className="p-2 ml-auto">Match2 :</h1>
              <form
                className="matchASubmit form d-flex mr-auto"
                onSubmit={e => this.onSubmitMatch2(e)}
              >
                <div className="fieldOne">
                  {Object.keys(this.state.equipeAMatchB).length === 0 ? (
                    <div className="drop-equipeAMatchA bg-light">
                      <div
                        className="p-4 "
                        onDrop={event => this.onDropAB(event)}
                        onDragOver={event => this.onDragOverAB(event)}
                      >
                        Drop Something
                      </div>
                    </div>
                  ) : (
                    <div className="btn btn-danger">
                      {this.state.equipeAMatchB.title}
                    </div>
                  )}

                  <input
                    value={this.state.equipeAMatchB.title}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="fieldTwo">
                  {Object.keys(this.state.equipeBMatchB).length === 0 ? (
                    <div className="drop-equipebBMatchA bg-light">
                      <div
                        className="p-4"
                        onDrop={event => this.onDropBB(event)}
                        onDragOver={event => this.onDragOverBB(event)}
                      >
                        Drop Something
                      </div>
                    </div>
                  ) : (
                    <div className="btn btn-danger ml-2">
                      {this.state.equipeBMatchB.title}
                    </div>
                  )}

                  <input
                    value={this.state.equipeBMatchB.title}
                    style={{ display: "none" }}
                  />
                </div>
                <input
                  className="btn btn-secondary ml-3"
                  type="submit"
                  value="submit"
                />
              </form>
            </div>
          </div>
          {/*Tournoi form submit */}
          {Object.keys(this.state.MatchA).length === 0 ||
          Object.keys(this.state.MatchB).length === 0 ? null : (
            <button className="col-12 btn btn-success my-5">
              Submit Tournoi
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  equipes: state.equipes
});

export default connect(mapStateToProps, { getEquipes })(HomePage);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            isHead: props.isHead,
        };
    }

    render() {
        return (
            <div className={this.state.isHead ? 'headSquare' : 'square'}></div>
        );
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.interval = setInterval(() => this.tick(), 1000);
        document.onkeydown = this.handleKeyPress;
        this.state = {
            grid: [],
            boardWidth: 50,
            boardHeight: 50,
            xHead: 2,
            yHead: 2,
            direction: 'R',
        };
        this.initBoard();
    }

    tick() {
        this.setScore();
        this.moveHead();
    }

    setScore() {
        let score = Number(document.getElementById("score").innerHTML);
        score++
        document.getElementById("score").innerHTML = score.toString();
    }

    moveHead() {
        if (this.state.direction === 'R') {
            this.setState({xHead: this.state.xHead + 1})
        }
        else if (this.state.direction === 'D') {
            this.setState({yHead: this.state.yHead + 1})
        }
        else if (this.state.direction === 'L') {
            this.setState({xHead: this.state.xHead - 1})
        }
        else if (this.state.direction === 'U') {
            this.setState({yHead: this.state.yHead - 1})
        }
        console.log(this.state);

        this.renderHead()
    }

    renderHead() {
        var newSquare = this.renderSquare(this.state.xHead, this.state.yHead, true);

        var updatedGrid = this.state.grid;
        var rowElement = React.cloneElement(updatedGrid[this.state.yHead], { key: Math.random() });
        rowElement.props.children.splice(this.state.xHead, 1, newSquare);
        updatedGrid.splice(this.state.yHead, 1, rowElement);
        
        this.setState({grid: updatedGrid})
    }

    handleKeyPress = (e) => {
        if (e.key === 'ArrowUp') {
            this.setState({direction:'U'})
        }
        else if (e.key === 'ArrowDown') {
            this.setState({direction:'D'})
        }
        else if (e.key === 'ArrowLeft') {
            this.setState({direction:'L'})
        }
        else if (e.key === 'ArrowRight') {
            this.setState({direction:'R'})
        }

        document.getElementById("direction").innerHTML = this.state.direction;
    }

    initBoard() {
        //Create the grid of the chosen size
        for (let i = 0; i < this.state.boardHeight; i++) {
            this.state.grid.push(<div className="board-row" key={Math.random()}>
                {this.renderSquares(this.state.boardWidth, i)}
            </div>)
        }

        return this.state.grid;
    }

    renderSquares(width, heightIndex) {
        const squares = [];
        for (let i = 0; i < width; i++) {
            squares.push(this.renderSquare(i, heightIndex, false));
        }
        return squares;
    }

    renderSquare(x, y, isHead) {
        return <Square x={x} y={y} isHead={isHead} key={Math.random()}></Square>;
    }

    render() {
        return (
            <div>
                {this.state.grid}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-details">
                    <p className="game-details">direction:&nbsp;</p>
                    <p className="game-details" id="direction"></p>
                    <p className="game-details">&nbsp;score:&nbsp;</p>
                    <p className="game-details" id="score"></p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
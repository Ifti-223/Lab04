$(document).ready(function () {
    var userScore = 0;
    var player2Score = 0;
    var match = 0;
    var gameState = [];
    var currentPlayer = -1; // -1 for Player 1, 1 for Player 2

    function init() {
        gameState = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(0);
            }
            gameState.push(row);
        }
        $(".cell").removeClass("user computer").find(".ball").css("opacity", 0);
        $(".overlay").fadeOut(500);
        currentPlayer = -1; // Player 1 starts
    }

    function checkWin(state, player) {
        // Check all win conditions
        var inRow = 5;

        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (state[i][j] == player) {
                    // Horizontal
                    if (j <= 10 - inRow) {
                        var win = true;
                        for (var k = 0; k < inRow; k++) {
                            if (state[i][j + k] != player) {
                                win = false;
                                break;
                            }
                        }
                        if (win) return true;
                    }

                    // Vertical
                    if (i <= 10 - inRow) {
                        var win = true;
                        for (var k = 0; k < inRow; k++) {
                            if (state[i + k][j] != player) {
                                win = false;
                                break;
                            }
                        }
                        if (win) return true;
                    }

                    // Diagonal right
                    if (i <= 10 - inRow && j <= 10 - inRow) {
                        var win = true;
                        for (var k = 0; k < inRow; k++) {
                            if (state[i + k][j + k] != player) {
                                win = false;
                                break;
                            }
                        }
                        if (win) return true;
                    }

                    // Diagonal left
                    if (i <= 10 - inRow && j >= inRow - 1) {
                        var win = true;
                        for (var k = 0; k < inRow; k++) {
                            if (state[i + k][j - k] != player) {
                                win = false;
                                break;
                            }
                        }
                        if (win) return true;
                    }
                }
            }
        }
        return false;
    }

    function playerMove(cell) {
        var index = cell.index();
        var x = Math.floor(index / 10);
        var y = index % 10;

        if (gameState[x][y] != 0) return; // already filled

        gameState[x][y] = currentPlayer;

        if (currentPlayer == -1) {
            cell.addClass("user");
        } else {
            cell.addClass("computer");
        }
        cell.find(".ball").css("opacity", 1);

        if (checkWin(gameState, currentPlayer)) {
            match++;
            if (currentPlayer == -1) {
                userScore++;
                $(".greeting").text("Player 1 Wins!");
            } else {
                player2Score++;
                $(".greeting").text("Player 2 Wins!");
            }
            $(".userScore").text(userScore + "/" + match);
            $(".computerScore").text(player2Score + "/" + match);
            $(".overlay").fadeIn(500);
            return;
        }

        // Change turn
        currentPlayer *= -1;
    }

    $(".cell").click(function () {
        playerMove($(this));
    });

    $(".playBtn, .tryBtn").click(function () {
        init();
    });

    init();
});

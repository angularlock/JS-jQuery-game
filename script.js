var moveHistory = [];
var num = 0;
var redoHistory = [];
str = [];

$(document).ready(function () {
    window.onload = function () {
        window.alert("Please Select Difficulty!");
    }

    $('.btn_reset').on('click', function () {
        getRandomNumber();
        arrangeNumber();
        $('#count').val(0);
        moveHistory = [];
        redoHistory = [];
    });

    $('.btn_undo').on('click', function () {
        if (0 < moveHistory.length) {
            var item = -moveHistory.pop();
            console.log(moveHistory);
            $('#count').val((moveHistory.length));
            moveCard(item, -1);
            redoHistory.push(item);
        }
    });

    $('.btn_redo').on('click', function () {
        if (0 < redoHistory.length) {
            var item = -redoHistory.pop();
            moveCard(item, 1);
        }
    });

    $('#difficulty').on('change', function () {
        $('.card').remove();
        $('#count').val(0);
        moveHistory = [];
        redoHistory = [];
        selectRows = parseInt($('#difficulty').val());
        getRandomNumber(selectRows);
        for (i = 0; i < str.length - 1; i++) {
            $('.number_pad_wrapper').append(`<div class="card" id="card-${str[i]}">${str[i]}</div>`);
        }
        $('.number_pad_wrapper').css('width', selectRows * 75);
        $('.number_pad_wrapper').css('height', selectRows * 75);
        arrangeNumber();
    });
});

function arrangeNumber() {
    for (i = 0; i < str.length; i++) {
        $("#card-" + str[i]).css('left', (i % selectRows) * 75);
        $("#card-" + str[i]).css('top', (parseInt(i / selectRows)) * 75);
    }
}

function moveCard(x, switch_number) {
    currentPosition = str.indexOf(0);
    targetPosition = parseInt(currentPosition + x);
    targetNumber = str[targetPosition];

    if (parseInt(targetPosition / selectRows) == parseInt(currentPosition / selectRows) ||parseInt(targetPosition % selectRows) == parseInt(currentPosition % selectRows)) {
        if (targetPosition >= 0 && targetPosition < Math.pow(selectRows, 2)) {
            newStr = swap(str, currentPosition, targetPosition);
            str = newStr;
            arrangeNumber();
            if (switch_number == 0) {
                var countVal = parseInt($('#count').val()) + 1;
                $('#count').val(countVal);
                moveHistory.push(x);
                redoHistory = [];
            } else if (switch_number == 1) {
                //redo switch
                var countVal = parseInt($('#count').val()) + 1;
                $('#count').val(countVal);
                moveHistory.push(x);
            }
            // if switch_number == -1, Undo
        }
    }
}

function getRandomNumber() {
    str = [];
    var nums = [],
        j = 0;
    for (x = 1; x < Math.pow(selectRows, 2); x++) {
        nums.push(x);
    }
    var i = nums.length;
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        str.push(nums[j]);
        nums.splice(j, 1);
    }
    str.push(0);
    return str;
}

$(document).keydown(function (e) {
    if (e.which == 37) {
        moveCard(1, 0);
    };
    if (e.which == 38) {
        moveCard(selectRows, 0);
    };
    if (e.which == 39) {
        moveCard(-1, 0);
    };
    if (e.which == 40) {
        moveCard(-selectRows, 0);
    };
});

$('.btn_up').on("click", function (e) {
    moveCard(selectRows, 0);
});

$('.btn_left').on("click", function (e) {
    moveCard(1, 0);
});

$('.btn_right').on("click", function (e) {
    moveCard(-1, 0);
});

$('.btn_down').on("click", function (e) {
    moveCard(-selectRows, 0);
});

function swap(input, index_A, index_B) {
    let temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
    return input;
}
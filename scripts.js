$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            var $columnAddImportantCard = $('<button>').addClass('add-card').text('Add a Priority Card');
            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                var name = prompt("Enter the name of the card");

                if (name.length == 0) {
                    self.addCard(new Card("Card", false));

                } else if (name != null) {
                    self.addCard(new Card(name, false));
                }
            });

            $columnAddImportantCard.click(function() {
                var name = prompt("Enter the name of the card");

                if (name.length == 0) {
                    self.addCard(new Card("Card", true));

                } else if (name != null) {
                    self.addCard(new Card(name, true));
                }
            });

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnAddImportantCard)
                .append($columnCardList);
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description, isImportant) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.isImportant = isImportant;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            if (isImportant) {
                $card.addClass('important');
            }
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function() {
                self.removeCard();
            });
            $card.append($cardDelete)
                .append($cardDescription);
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    var number = 1;
    $('.create-column').click(function() {
        var name = prompt('Enter a column name');

        if (name.length == 0) {
            var column = new Column("Column" + number);
            board.addColumn(column);
            number++;
        } else if (name != null) {
            var column = new Column(name);
            board.addColumn(column);
        }
    });

    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');


    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);


    var card1 = new Card('');
    var card2 = new Card('');
    var card3 = new Card('');

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});
let model;

let state = 'collection';

function setup() {
    createCanve(400, 400);

    let options = {
        input: ['x', 'y'],
        output: ['label'],
        task: 'classification',
        debug: 'true'
    }

    model = ml5.neuralNetwork(options)
    background(255);
}
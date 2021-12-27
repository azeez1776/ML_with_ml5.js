let model;

let state = 'collection';

let targetLabel = 'C'

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

function keyPressed() {
    if (key === 't') {
        state = "training";
        console.log('machine training');
        model.normalizeData();
        let options = {
            epochs: 200
        }
        model.train(options, whileTraining, finishedTraining);
    } else {
        targetLabel = key.toUpperCase()
    }
}

function whileTraining() {
    console.log(epochs);
}

function finishedTraining() {
    console.log('Finished Training');
    state = 'prediction'
}
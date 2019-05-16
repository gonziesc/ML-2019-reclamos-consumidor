import sys

from nimblenet.activation_functions import sigmoid_function
from nimblenet.cost_functions import cross_entropy_cost
from nimblenet.learning_algorithms import backpropagation
from nimblenet.data_structures import Instance
from nimblenet.neuralnet import NeuralNet
dataset        = [ Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 0, 5, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 2, 0, 38 ],  [ 0 ] ),
  Instance([ 3, 16, 94 ],  [ 0 ] ),
  Instance([ 0, 5, 6 ],  [ 0 ] ),
  Instance([ 2, 20, 74 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 3, 12, 82 ],  [ 0 ] ),
  Instance([ 0, 12, 82 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 3, 12, 82 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 0, 2, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 0, 2, 6 ],  [ 0 ] ),
  Instance([ 3, 2, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 0, 5, 2 ],  [ 0 ] ),
  Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 3, 5, 6 ],  [ 0 ] ),
  Instance([ 3, 2, 6 ],  [ 0 ] ),
  Instance([ 3, 6, 30 ],  [ 0 ] ),
  Instance([ 3, 11, 26 ],  [ 0 ] ),
  Instance([ 3, 5, 2 ],  [ 0 ] ),
  Instance([ 0, 0, 38 ],  [ 1 ] ),
  Instance([ 1, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 1, 0, 38 ],  [ 1 ] ),
  Instance([ 3, 0, 38 ],  [ 1 ] ),
  Instance([ 4, 0, 38 ],  [ 1 ] ),
  Instance([ 1, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 1, 10 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 1, 10 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 1, 10 ],  [ 1 ] ),
  Instance([ 1, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 1, 10 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),
  Instance([ 4, 0, 38 ],  [ 1 ] ),
  Instance([ 1, 0, 38 ],  [ 1 ] ),
  Instance([ 2, 0, 38 ],  [ 1 ] ),]

settings       = {
    "n_inputs" : 3,
    "layers"   : [  (5, sigmoid_function), (1, sigmoid_function) ]
}
network        = NeuralNet( settings )
training_set   = dataset
test_set       = dataset
cost_function  = cross_entropy_cost
backpropagation(
        network,           # the network to train
        training_set,      # specify the training set
        test_set,          # specify the test set
        cost_function,     # specify the cost function to calculate error
        max_iterations = 10000,
    )
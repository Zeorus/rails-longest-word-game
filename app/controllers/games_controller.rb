require 'open-uri'
require 'json'

class GamesController < ApplicationController

  def new
    @random_grid = []
    9.times { @random_grid << ("A".."Z").to_a.sample }
  end

  def score
    @result = { score: 0, win: 0 }
    attempt = params[:word].upcase.split(//)
    # @all_existing_words = all_words(params[:grid].gsub(" ", "").split(//))
    word = parsing(params[:word])

    if attempt.all? { |letter| attempt.count(letter) <= params[:grid].count(letter) } == true
      if word["found"]
        @result[:win] = 1
      end
      @result[:score] = scoring(attempt)
    end
    return @result
  end

  private

  def url(word)
    return "https://wagon-dictionary.herokuapp.com/#{word.downcase}"
  end

  def parsing(attempt)
    word_serialized = open(url(attempt)).read
    JSON.parse(word_serialized)
  end

  def scoring(attempt)
    score = 0
    attempt.each do |letter|
      if ["D", "G"].include?(letter)
        score += 2
      elsif ["B", "C", "M", "P"].include?(letter)
        score += 3
      elsif ["F", "H", "V", "W", "Y"].include?(letter)
        score += 4
      elsif letter == "K"
        score += 5
      elsif ["J", "X"].include?(letter)
        score += 8
      elsif ["Q", "Z"].include?(letter)
        score += 10
      else
        score += 1
      end
    end
    return score
  end

  def all_words(letters)
    all_existing_words = []
    possibles_words = letters.permutation.to_a.map(&:join)
    possibles_words.each do |word|
      if parsing(word)["found"]
        all_existing_words << word
      end
    end
    return all_existing_words
  end

end
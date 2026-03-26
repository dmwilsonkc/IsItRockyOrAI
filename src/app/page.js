"use client";

import React, { useState, useEffect } from 'react';
import { Star, RotateCcw } from 'lucide-react';

const statements = [
  { text: "We exist to improve the lives of working men and women in the construction industry...", isRocky: true },
  { text: "Allegory at its finest", isRocky: true },
  { text: "Strong Alone, Unstoppable Together is more than the MACRC's registered trademark...", isRocky: true },
  { text: "We improve the lives of our membership, our communities and we attract employers...", isRocky: true },
  { text: "In full transparency, the hourly report will be based on pure circumspection...", isRocky: true },
  { text: "Understanding that time is a finite resource can help you make the most of it.", isRocky: true },
  { text: "Being either a bully or a nice guy both provide short term benefits...", isRocky: true },
  { text: "No leader is successful on their own, it takes a team to get things done.", isRocky: true },
  { text: "Without people to lead, a leader is just some random person out for a walk.", isRocky: true },
  { text: "A closed system has no opportunity for growth.", isRocky: true },
  { text: "The only way you are going to gather information and influence a situation...", isRocky: true },
  { text: "If there is a culture of learning that exists in your workplace...", isRocky: true },
  { text: "Helping the members of your team reach their goals is an amazing gift to them...", isRocky: true },
  { text: "Do the right thing, even when there isn't an audience", isRocky: true },
  { text: "If you have ever believed in something and tried to influence someone else...", isRocky: true },
  { text: "Never under estimate your ability to influence a situation.", isRocky: true },
  { text: "Strategic vision without tactical execution is merely a daydream in the boardroom.", isRocky: false },
  { text: "Leadership excellence is measured by the growth of those around you...", isRocky: false },
  { text: "Innovation thrives at the intersection of diverse perspectives...", isRocky: false },
  { text: "Effective communication isn't about speaking louder, but listening deeper.", isRocky: false },
  { text: "The modern workplace requires adaptive leadership styles...", isRocky: false },
  { text: "Success in leadership is often determined by how well you handle failure.", isRocky: false },
  { text: "A leader's greatest asset is their ability to transform challenges...", isRocky: false },
  { text: "The future of organizational success lies in creating inclusive environments...", isRocky: false },
  { text: "Emotional intelligence and data-driven decision making are not mutually exclusive...", isRocky: false },
  { text: "Sustainable leadership practices prioritize long-term vision over short-term gains.", isRocky: false },
  { text: "The best time to organize your digital files is before you need to find something urgently.", isRocky: false },
  { text: "If something seems too good to be true in your inbox, it probably originated from a Nigerian prince.", isRocky: false },
  { text: "Backing up your data is like flossing - everyone knows they should do it more often.", isRocky: false },
  { text: "The universal law of USB plugs: it takes three tries to get it right.", isRocky: false },
];

export default function QuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [shuffled, setShuffled] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  useEffect(() => {
    shuffleStatements();
  }, []);

  const shuffleStatements = () => {
    const arr = [...statements];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
  };

  const handleGuess = (isRocky) => {
    if (shuffled.length === 0) return;

    const correct = isRocky === shuffled[currentIndex].isRocky;
    setWasCorrect(correct);
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setAnswered(answered + 1);
    setRevealed(true);
  };

  const nextStatement = () => {
    // Check if we've answered all 30 questions
    if (answered >= 30) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setRevealed(false);
  };

  const resetGame = () => {
    setScore(0);
    setAnswered(0);
    setStreak(0);
    setCurrentIndex(0);
    setRevealed(false);
    setIsFinished(false);
    shuffleStatements();
  };

  // Show results screen after completing all 30 questions
  if (isFinished) {
    const percentage = Math.round((score / 30) * 100);
    let message = "";

    if (percentage >= 90) {
      message = "Outstanding! You're a Rocky vs AI expert! 🏆";
    } else if (percentage >= 75) {
      message = "Great job! You know Rocky's style well! 🌟";
    } else if (percentage >= 60) {
      message = "Not bad! You're getting the hang of it! 👍";
    } else if (percentage >= 50) {
      message = "Keep practicing! You'll get better! 💪";
    } else {
      message = "Rocky and AI are quite different - try again! 🤔";
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-2xl rounded-xl border bg-white shadow-lg">
          <div className="p-8 text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">Quiz Complete! 🎉</h2>

            <div className="space-y-4">
              <div className="text-6xl font-extrabold text-indigo-600">
                {score}/30
              </div>
              <div className="text-2xl font-semibold text-gray-700">
                {percentage}% Correct
              </div>
              <p className="text-xl text-gray-600 mt-4">
                {message}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-left bg-gray-50 p-6 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Total Score</p>
                <p className="text-2xl font-bold text-gray-800">{score}/30</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="text-2xl font-bold text-gray-800">{percentage}%</p>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="flex items-center justify-center gap-2 px-6 py-3 mx-auto rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (shuffled.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl rounded-xl border bg-white shadow-lg">
        <div className="flex flex-col space-y-4 p-6">
          <h3 className="text-center text-3xl font-bold text-gray-800">Is it Rocky or AI?</h3>
          <p className="text-center text-gray-600">
            Distinguish statements from Rocky Kloth (regional director) versus AI Generated
          </p>

          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg mt-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-700">Score: {score}/{answered}</span>
            </div>
            <div className="font-semibold text-gray-700">
              Current Streak: <span className="text-indigo-600">{streak}</span>
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 font-medium">
            Question {answered + 1} of 30
          </div>
        </div>

        <div className="p-6 pt-0 space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-lg border-2 border-indigo-100">
            <p className="text-lg text-center text-gray-800 leading-relaxed">
              "{shuffled[currentIndex].text}"
            </p>
          </div>

          {!revealed ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleGuess(true)}
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                Rocky Kloth 👨‍💼
              </button>
              <button
                onClick={() => handleGuess(false)}
                className="px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                AI Generated 🤖
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className={`p-4 rounded-lg ${
                wasCorrect
                  ? 'bg-green-50 border-2 border-green-300'
                  : 'bg-red-50 border-2 border-red-300'
              }`}>
                <p className="text-xl font-bold">
                  {shuffled[currentIndex].isRocky
                    ? "This was Rocky Kloth! 👨‍💼"
                    : "This was AI Generated! 🤖"}
                </p>
              </div>
              <button
                onClick={nextStatement}
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                {answered >= 30 ? 'See Results' : 'Next Statement'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

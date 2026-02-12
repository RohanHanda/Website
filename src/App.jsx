
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Camera, Star } from 'lucide-react';

function ValentinesSite() {
  const [hearts, setHearts] = useState([]);
  const [currentPage, setCurrentPage] = useState('cover');
  const [collectedHearts, setCollectedHearts] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  // Wishlist state
 // Wishlist state with localStorage persistence
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('valentineWishes');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, title: "Trip Somewhere(Mountains)", addedBy: "You", emoji: "🏔️", color: "#FFB6C1", completed: false },
      { id: 2, title: "Cook together", addedBy: "You", emoji: "👨‍🍳", color: "#FFE4E1", completed: false },
      { id: 3, title: "Sleep together(Sleep sleep)", addedBy: "You", emoji: "😴", color: "#FFC0CB", completed: false },
      { id: 4, title: "Stargazing date", addedBy: "You", emoji: "⭐", color: "#FFB6D9", completed: false },
      { id: 5, title: "Roam around the city for the entire day", addedBy: "You", emoji: "🏢", color: "#FFB6D9", completed: false },
      { id: 6, title: "Graduate", addedBy: "You", emoji: "🎓", color: "#FFB6D9", completed: false },
      { id: 7, title: "Complete another 365 days", addedBy: "You", emoji: "📅", color: "#FFB6D9", completed: false },
    ];
  });
  
  const [newWish, setNewWish] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [showAddWish, setShowAddWish] = useState(false);
  
  const emojiOptions = ['💖', '✨', '🌹', '🎡', '🌅', '⭐', '🎬', '🍕', '✈️', '📚', '🎨', '🎵', '🏔️', '🌊', '🎮', '☕'];

  // Save wishes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('valentineWishes', JSON.stringify(wishes));
  }, [wishes]);// Wishlist state with localStorage persistence

  const [unlockedSections, setUnlockedSections] = useState({
    letter: false,
    memories: false,
    coupons: false
  });
  
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);

  const noMessages = [
    "Oops! The button moved! 😊",
    "Hehe, try again! 💕",
    "You can't escape! 😄",
    "Just say yes already! 💖",
    "Come on, you know you want to! 🥰",
    "The answer is YES! 💗",
    "Stop being silly! 😆",
    "I'm not giving up! 💪",
    "You're making this harder than it needs to be! 😂",
    "Fine, I'll make the YES button even BIGGER! 💝",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2
      };
      setHearts(prev => [...prev.slice(-10), newHeart]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const confettiColors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF6B9D', '#C71585', '#FFD700', '#FF69B4'];
      const newConfetti = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setConfetti(newConfetti);
      
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [showConfetti]);

  // const memories = [
  //   { title: "Our First Date", emoji: "🌹", color: "#FFB6C1",imageUrl:'images/IMG20251128175810.jpg' },
  //   { title: "That Amazing Weekend", emoji: "✨", color: "#FFE4E1" },
  //   { title: "When You Made Me Laugh So Hard", emoji: "😄", color: "#FFC0CB" },
  //   { title: "Our Adventure Together", emoji: "🎡", color: "#FFB6D9" },
  //   { title: "Just Being Us", emoji: "💕", color: "#FFD4E5" },
  //   { title: "The Day I Knew", emoji: "💖", color: "#FFE4EC" }
  // ];

  const puzzles = [
    { 
      id: 'letter', 
      name: 'Love Letter', 
      unlocks: 'letter', 
      emoji: '💌', 
      color: '#FFB6C1', 
      gridSize: 3,
      imageUrl: 'https://i.pinimg.com/1200x/9c/0e/46/9c0e4629a53d75e42c2f08b05996f768.jpg'
    },
    { 
      id: 'memories', 
      name: 'Our Wishlist', 
      unlocks: 'memories', 
      emoji: '📸', 
      color: '#FFE4E1', 
      gridSize: 4,
      imageUrl: 'https://i.pinimg.com/1200x/a3/ea/b8/a3eab8654f7fbd1848a69424cbde3f16.jpg'
    },
    { 
      id: 'coupons', 
      name: 'Special Surprise', 
      unlocks: 'coupons', 
      emoji: '🎁', 
      color: '#FFC0CB', 
      gridSize: 4,
      imageUrl: 'https://i.pinimg.com/736x/60/f2/e6/60f2e68dd25a6d04fd3e5c5b97d0bc01.jpg'
    }
  ];

  const [selectedPiece, setSelectedPiece] = useState(null);

  const initializePuzzle = (puzzle) => {
    const size = puzzle.gridSize;
    const pieces = [];
    for (let i = 0; i < size * size; i++) {
      pieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        row: Math.floor(i / size),
        col: i % size
      });
    }
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i].currentPosition, pieces[j].currentPosition] = [pieces[j].currentPosition, pieces[i].currentPosition];
    }
    setPuzzlePieces(pieces);
    setCurrentPuzzle(puzzle);
    setSelectedPiece(null);
    setCurrentPage('puzzle');
  };

  const checkPuzzleSolved = (pieces) => {
    return pieces.every(piece => piece.currentPosition === piece.correctPosition);
  };

  const handlePieceClick = (clickedIndex) => {
    if (selectedPiece === null) {
      setSelectedPiece(clickedIndex);
    } else if (selectedPiece === clickedIndex) {
      setSelectedPiece(null);
    } else {
      const newPieces = [...puzzlePieces];
      const piece1 = newPieces.find(p => p.currentPosition === selectedPiece);
      const piece2 = newPieces.find(p => p.currentPosition === clickedIndex);
      
      piece1.currentPosition = clickedIndex;
      piece2.currentPosition = selectedPiece;
      
      setPuzzlePieces(newPieces);
      setSelectedPiece(null);

      if (checkPuzzleSolved(newPieces)) {
        setTimeout(() => {
          setShowConfetti(true);
          setSolvedPuzzles([...solvedPuzzles, currentPuzzle.id]);
          setUnlockedSections({
            ...unlockedSections,
            [currentPuzzle.unlocks]: true
          });
          setTimeout(() => {
            setCurrentPage('home');
          }, 2000);
        }, 300);
      }
    }
  };

  const handleNoHover = () => {
    setNoAttempts(prev => prev + 1);
    setYesButtonSize(prev => Math.min(prev + 0.3, 3));
    
    const newX = Math.random() * 60 - 30;
    const newY = Math.random() * 60 - 30;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setCurrentPage('home');
    }, 1000);
  };

  const addWish = () => {
    if (newWish.trim()) {
      const newWishItem = {
        id: Date.now(),
        title: newWish,
        addedBy: "Her", // You can change this based on who's adding
        emoji: selectedEmoji,
        color: ['#FFB6C1', '#FFE4E1', '#FFC0CB', '#FFB6D9', '#FFD4E5', '#FFE4EC'][Math.floor(Math.random() * 6)],
        completed: false
      };
      setWishes([...wishes, newWishItem]);
      setNewWish('');
      setShowAddWish(false);
    }
  };
  
  const toggleComplete = (id) => {
    setWishes(wishes.map(wish => 
      wish.id === id ? { ...wish, completed: !wish.completed } : wish
    ));
  };
  
  const deleteWish = (id) => {
    setWishes(wishes.filter(wish => wish.id !== id));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 overflow-hidden relative">
      {showConfetti && confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute top-0 w-3 h-3 rounded-full animate-confetti-fall pointer-events-none"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.backgroundColor,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute bottom-0 text-pink-400 opacity-30 pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animation: `float ${heart.duration}s ease-in ${heart.delay}s`,
            fontSize: '2rem'
          }}
        >
          ❤️
        </div>
      ))}

      <div className="absolute top-10 left-10 text-yellow-300 animate-pulse">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-20 right-20 text-pink-300 animate-pulse delay-300">
        <Sparkles size={20} />
      </div>
      <div className="absolute bottom-20 left-1/4 text-red-300 animate-pulse delay-700">
        <Sparkles size={18} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {currentPage === 'cover' && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
            <div className="text-center animate-scale-in">
              <div className="mb-8 relative">
                <div className="text-9xl animate-float-gentle">💝</div>
                <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">✨</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-spin-slow delay-500">💫</div>
              </div>
              
              <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-500 mb-6 animate-gradient">
                Hey Babe!
              </h1>
              
              <p className="text-3xl text-pink-600 mb-12 animate-pulse">
                I have something special to ask you...
              </p>
              
              <button
                onClick={() => setCurrentPage('question')}
                className="group relative bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-pink-400 transform hover:scale-110 transition-all duration-300 animate-bounce-slow"
              >
                <span className="relative z-10">Click Me! 💕</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </button>
            </div>
            
            <div className="absolute top-20 left-10 text-6xl animate-bounce delay-300">💗</div>
            <div className="absolute top-40 right-20 text-5xl animate-bounce delay-700">💖</div>
            <div className="absolute bottom-32 left-1/4 text-6xl animate-bounce delay-500">💕</div>
            <div className="absolute bottom-40 right-1/3 text-5xl animate-bounce delay-900">💓</div>
          </div>
        )}

        {currentPage === 'question' && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
            <div className="text-center max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-2xl relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2">
                  <Heart className="w-12 h-12 text-red-500 animate-heartbeat" fill="currentColor" />
                  <Heart className="w-16 h-16 text-pink-500 animate-heartbeat delay-200" fill="currentColor" />
                  <Heart className="w-12 h-12 text-red-500 animate-heartbeat delay-400" fill="currentColor" />
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-8 mt-8">
                Will You Be My Valentine?🥹
              </h1>
              
              {noAttempts > 0 && (
                <p className="text-2xl text-pink-600 mb-6 animate-bounce">
                  {noMessages[Math.min(noAttempts - 1, noMessages.length - 1)]}
                </p>
              )}

              <div className="flex gap-6 justify-center items-center mt-12 relative" style={{ minHeight: '120px' }}>
                <button
                  onClick={handleYesClick}
                  className={`bg-gradient-to-r from-green-400 to-green-500 text-white px-12 py-6 rounded-full text-3xl font-bold shadow-2xl hover:shadow-green-400 transform hover:scale-110 transition-all duration-300 ${showConfetti ? 'animate-wiggle' : ''}`}
                  style={{
                    transform: `scale(${yesButtonSize})`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {showConfetti ? '🎉 YES! 🎉' : 'Yes! 💕'}
                </button>
                
                <button
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  onTouchStart={handleNoHover}
                  className="bg-gray-400 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all duration-200 absolute animate-shake"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                    right: '20%',
                    opacity: noAttempts > 7 ? 0.3 : 1,
                    fontSize: noAttempts > 5 ? '0.8rem' : '1.25rem'
                  }}
                >
                  {noAttempts > 8 ? '🏃‍♂️' : 'No'}
                </button>
              </div>

              {yesButtonSize > 1.5 && (
                <p className="text-pink-500 mt-8 text-lg animate-pulse">
                  {yesButtonSize < 2 && "The 'Yes' button is getting bigger because that's the right answer! 😉"}
                  {yesButtonSize >= 2 && yesButtonSize < 2.5 && "Look how BIG the 'Yes' button is now! Just like my....."}
                  {yesButtonSize >= 2.5 && "Karle yaar itna bhi bura nhi hu"}
                </p>
              )}
            </div>
          </div>
        )}

        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl animate-float-up"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  {['💕', '💖', '💗', '💓', '💝', '💘'][Math.floor(Math.random() * 6)]}
                </div>
              ))}
            </div>

            <div className="text-center mb-12 animate-bounce-slow relative z-10">
              <div className="relative inline-block">
                <Heart className="w-24 h-24 mx-auto text-red-500 mb-6 animate-heartbeat" fill="currentColor" />
                <div className="absolute -top-2 -right-2 text-4xl animate-spin-slow">⭐</div>
                <div className="absolute -bottom-2 -left-2 text-4xl animate-spin-slow delay-500">✨</div>
              </div>
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 mb-4 animate-gradient">
                Yay! You Said Yes! Let's gooooooooooooo 🎉
              </h1>
              <p className="text-2xl text-pink-600 font-semibold animate-pulse">I love you so so so so much! 💖</p>
              <p className="text-lg text-pink-500 mt-4">Solve puzzles to unlock special surprises! 🧩</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full relative z-10">
              {puzzles.map((puzzle, index) => {
                const isUnlocked = unlockedSections[puzzle.unlocks];
                const isSolved = solvedPuzzles.includes(puzzle.id);
                
                return (
                  <div
                    key={puzzle.id}
                    className="relative"
                    style={{
                      animation: `slide-up 0.6s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          setCurrentPage(puzzle.unlocks);
                        } else {
                          initializePuzzle(puzzle);
                        }
                      }}
                      className="w-full bg-white rounded-3xl p-8 shadow-2xl hover:shadow-pink-300 hover:scale-105 transform transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4">
                        {isSolved ? (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                            <span className="text-white text-xl">✓</span>
                          </div>
                        ) : isUnlocked ? (
                          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">🔓</span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-xl">🔒</span>
                          </div>
                        )}
                      </div>

                      <div 
                        className="w-full h-32 rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: puzzle.color }}
                      >
                        {isUnlocked ? puzzle.emoji : '🧩'}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{puzzle.name}</h3>
                      
                      {!isUnlocked && (
                        <p className="text-pink-500 font-semibold">Click to solve puzzle!</p>
                      )}
                      
                      {isUnlocked && !isSolved && (
                        <p className="text-green-500 font-semibold">Unlocked! Click to view!</p>
                      )}
                      
                      {isSolved && (
                        <p className="text-green-600 font-semibold">✨ Completed! ✨</p>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-white rounded-3xl p-6 shadow-lg relative z-10">
              <p className="text-gray-700 text-lg mb-2">
                <strong>Progress:</strong> {solvedPuzzles.length} / {puzzles.length} puzzles solved
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(solvedPuzzles.length / puzzles.length) * 100}%` }}
                />
              </div>
              {solvedPuzzles.length === puzzles.length && (
                <p className="text-pink-600 font-bold mt-4 text-xl animate-pulse">
                  🎉 All puzzles complete! You've unlocked everything! Just like you unlock my heart! I knew you could do it🎉
                </p>
              )}
            </div>
          </div>
        )}

        {currentPage === 'letter' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>
            <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-pink-200 relative">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              
              <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                To Bair
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p className="animate-slide-up">
                  Hi Beautiful!!!!
                </p>
                <p className="animate-slide-up delay-200">
                  Happy Valentines Day, I know we dont celebrate valentines and all, but I just wanted to do something special for you. Toh, yeah apni puri ek brain cell use karke I made this.
                </p>
                <p className="animate-slide-up delay-400">
                  And honestly dimag kharab hogaya mera isko deploy karte karte, but yeah I finally got it working😭. I know aaj kal sab yeh hi kar rahe hai, and obviously ai ne kiya hai sara heavy lifting, but personalize kiya meine, coder jo hu😏.
                </p>
                <p className="animate-slide-up delay-600">
                  All of this made me realize ki meine AIML kyu choose kiya, anyways coming to the main point, I really love you more than I can explain in words and ik we havent been the most talkative in the last few days, but gate is more important than us and ik you will do really well.
                </p>
                <p className="animate-slide-up delay-800">
                  So to not disturb you from your studies I decided to make this, I really love you and gate ke baad party karne chalenge
                </p>
                <p className="text-right font-semibold text-pink-600 mt-8 animate-slide-up delay-800">
                  Forever yours,<br/>
                  Your 🐒
                </p>
              </div>
            </div>
          </div>
        )}

        {/* /* {currentPage === 'memories' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>
            
            <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Our Beautiful Moments 📸
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memories.map((memory, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                  style={{
                    animation: `slide-up 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div 
                    className="w-full h-48 rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: memory.color }}
                  >
                    {memory.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    {memory.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )} */}
        {currentPage === 'memories' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>
            
            <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Our Wishlist Together ✨
            </h2>
            <p className="text-center text-pink-600 text-lg mb-8">
              Things we want to do together! Add your wishes anytime 💕
            </p>

            {/* Add Wish Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowAddWish(!showAddWish)}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-pink-400 transform hover:scale-105 transition-all duration-300"
              >
                {showAddWish ? '✕ Cancel' : '+ Add New Wish'}
              </button>
            </div>

            {/* Add Wish Form */}
            {showAddWish && (
              <div className="max-w-2xl mx-auto mb-8 bg-white rounded-3xl p-8 shadow-xl animate-scale-in">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Add a New Wish 💫</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">What do you wish for?</label>
                  <input
                    type="text"
                    value={newWish}
                    onChange={(e) => setNewWish(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addWish()}
                    placeholder="e.g., Go on a beach vacation together"
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none text-lg"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Pick an emoji</label>
                  <div className="grid grid-cols-8 gap-2">
                    {emojiOptions.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`text-3xl p-2 rounded-lg hover:scale-110 transition-transform ${
                          selectedEmoji === emoji ? 'bg-pink-200 ring-2 ring-pink-500' : 'bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addWish}
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Add to Wishlist 💖
                </button>
              </div>
            )}

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish, index) => (
                <div
                  key={wish.id}
                  className={`bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative ${
                    wish.completed ? 'opacity-75' : ''
                  }`}
                  style={{
                    animation: `slide-up 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Delete button */}
                  <button
                    onClick={() => deleteWish(wish.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm font-bold"
                  >
                    ✕
                  </button>

                  {/* Emoji and completed badge */}
                  <div className="relative mb-4">
                    <div 
                      className="w-full h-32 rounded-2xl flex items-center justify-center text-6xl transition-transform"
                      style={{ backgroundColor: wish.color }}
                    >
                      {wish.emoji}
                    </div>
                    {wish.completed && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ✓ Done!
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`text-xl font-bold text-gray-800 text-center mb-2 ${
                    wish.completed ? 'line-through' : ''
                  }`}>
                    {wish.title}
                  </h3>
                  
                  <p className="text-center text-gray-500 text-sm mb-4">
                    Added by: <span className="text-pink-600 font-semibold">{wish.addedBy}</span>
                  </p>

                  {/* Toggle complete button */}
                  <button
                    onClick={() => toggleComplete(wish.id)}
                    className={`w-full py-2 rounded-lg font-semibold transition-all ${
                      wish.completed
                        ? 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                        : 'bg-gradient-to-r from-pink-400 to-red-400 text-white hover:from-pink-500 hover:to-red-500'
                    }`}
                  >
                    {wish.completed ? 'Mark Incomplete' : 'Mark as Done!'}
                  </button>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {wishes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xl mb-4">No wishes yet! Add your first wish above 💫</p>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 bg-gradient-to-r from-pink-200 to-red-200 rounded-3xl p-8 text-center">
              <p className="text-gray-800 text-xl font-semibold">
                💖 {wishes.filter(w => w.completed).length} / {wishes.length} wishes completed!
              </p>
              <p className="text-gray-700 mt-2">
                Keep adding and completing wishes together! 🌟
              </p>
            </div>
          </div>
        )}

        {currentPage === 'puzzle' && currentPuzzle && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Back to Home
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                Solve the Puzzle! 🧩
              </h2>
              <p className="text-gray-600 mb-2 text-lg">
                Unlock: <strong>{currentPuzzle.name}</strong>
              </p>
              <p className="text-pink-500 mb-8">
                {selectedPiece === null 
                  ? "Click a piece to select it, then click another piece to swap!"
                  : "Now click another piece to swap! (Click the same piece to deselect)"
                }
              </p>

              {/* <div 
                className="inline-grid gap-2 bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl mb-6"
                style={{
                  gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, 1fr)`,
                }}
              >
                {Array.from({ length: currentPuzzle.gridSize * currentPuzzle.gridSize }).map((_, position) => {
                  const piece = puzzlePieces.find(p => p.currentPosition === position);
                  const isSelected = selectedPiece === position;
                  const isCorrect = piece && piece.correctPosition === piece.currentPosition;
                  
                  if (!piece) return null;
                  
                  const pieceSize = 100 / currentPuzzle.gridSize;
                  const row = Math.floor(piece.id / currentPuzzle.gridSize);
                  const col = piece.id % currentPuzzle.gridSize;
                  const backgroundX = -col * pieceSize;
                  const backgroundY = -row * pieceSize;
                  
                  return (
                    <button
                      key={position}
                      onClick={() => handlePieceClick(position)}
                      className={`
                        w-24 h-24 md:w-28 md:h-28 rounded-xl shadow-lg
                        transform transition-all duration-300 hover:scale-105
                        relative overflow-hidden
                        ${isSelected ? 'ring-4 ring-pink-500 scale-110 z-10' : ''}
                        ${isCorrect ? 'ring-4 ring-green-400' : 'ring-2 ring-gray-300'}
                      `}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${currentPuzzle.imageUrl})`,
                          backgroundSize: `${currentPuzzle.gridSize * 100}%`,
                          backgroundPosition: `${backgroundX}% ${backgroundY}%`,
                          filter: isCorrect ? 'brightness(1.1)' : 'none'
                        }}
                      />
                      
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {piece.id + 1}
                      </div>
                      
                      {isCorrect && (
                        <div className="absolute top-1 left-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div> */}
              <div 
                className="inline-grid gap-2 bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl mb-6"
                style={{
                  gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, 1fr)`,
                }}
              >
                {Array.from({ length: currentPuzzle.gridSize * currentPuzzle.gridSize }).map((_, position) => {
                  const piece = puzzlePieces.find(p => p.currentPosition === position);
                  const isSelected = selectedPiece === position;
                  const isCorrect = piece && piece.correctPosition === piece.currentPosition;
                  
                  if (!piece) return null;
                  
                  // Calculate which part of the image this piece SHOULD show
                  // Based on the piece's ORIGINAL/CORRECT position (piece.id)
                  const pieceWidth = 100 / currentPuzzle.gridSize;
                  const pieceHeight = 100 / currentPuzzle.gridSize;
                  
                  // Calculate row and column from the piece's ID (correct position)
                  const correctRow = Math.floor(piece.id / currentPuzzle.gridSize);
                  const correctCol = piece.id % currentPuzzle.gridSize;
                  
                  // Background position to show the correct part of the image
                  const backgroundX = correctCol * pieceWidth;
                  const backgroundY = correctRow * pieceHeight;
                  
                  return (
                    <button
                      key={position}
                      onClick={() => handlePieceClick(position)}
                      className={`
                        w-24 h-24 md:w-28 md:h-28 rounded-xl shadow-lg
                        transform transition-all duration-300 hover:scale-105
                        relative overflow-hidden
                        ${isSelected ? 'ring-4 ring-pink-500 scale-110 z-10' : ''}
                        ${isCorrect ? 'ring-4 ring-green-400' : 'ring-2 ring-gray-300'}
                      `}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${currentPuzzle.imageUrl})`,
                          backgroundSize: `${currentPuzzle.gridSize * 100}% ${currentPuzzle.gridSize * 100}%`,
                          backgroundPosition: `${backgroundX}% ${backgroundY}%`,
                          filter: isCorrect ? 'brightness(1.1)' : 'none'
                        }}
                      />
                      
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {piece.id + 1}
                      </div>
                      
                      {isCorrect && (
                        <div className="absolute top-1 left-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-gray-500 text-sm mb-4">
                💡 Tip: Pieces in the correct position will show a green checkmark!
              </div>
            </div>
          </div>
        )}

        {currentPage === 'coupons' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>
            
            <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Love Coupons! 💝
            </h2>
            <p className="text-center text-pink-600 text-xl mb-12">Redeem these anytime you want! 😊</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Movie Night", subtitle: "Pick any movie!", emoji: "🎬", color: "#FFB6C1" },
                { title: "Kisses", subtitle: "Tabadtod makeout", emoji: "🫦", color: "#FFE4E1" },
                { title: "Massage", subtitle: "30 minutes of relaxation", emoji: "💆‍♀️", color: "#FFC0CB" },
                { title: "Date Night", subtitle: "Unfortunately, online meet pe hi ho sakta hai", emoji: "🌹", color: "#FFB6D9" },
                { title: "Dessert Run", subtitle: "Ice cream, waffles, you name it!", emoji: "🍨", color: "#FFD4E5" },
                { title: "Free Pass", subtitle: "Win any argument", emoji: "😇", color: "#FFE4EC" },
                { title: "Surprise Gift", subtitle: "Something special!", emoji: "🎁", color: "#FFDCE5" },
                { title: "Dance Party", subtitle: "Just us two!", emoji: "💃", color: "#FFB6E1" },
                { title: "Picnic Date", subtitle: "Under the stars", emoji: "🧺", color: "#FFC5D8" },
              ].map((coupon, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer border-4 border-dashed"
                  style={{
                    borderColor: coupon.color,
                    animation: `slide-up 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4"
                      style={{ backgroundColor: coupon.color }}
                    >
                      {coupon.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{coupon.title}</h3>
                    <p className="text-pink-600">{coupon.subtitle}</p>
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                      <p className="text-xs text-gray-500">VALID FOREVER • NO EXPIRATION</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-pink-200 to-red-200 rounded-3xl p-8 text-center">
              <p className="text-gray-800 text-xl font-semibold">
                💖 Each coupon can be redeemed whenever you want! 💖
              </p>
              <p className="text-gray-700 mt-2">
                Just show me this and I'll make it happen! No questions asked! 😊
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <ValentinesSite />;
}

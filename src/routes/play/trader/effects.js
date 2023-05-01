// ANIMATIONS AND EFFECTS FUNCTIONS

function animateColor(r1,g1,b1,r2,g2,b2,balance) {
    var bal = Math.min(Math.max(balance,0),1);
    var nbal = 1-bal;
    return {
            r : Math.floor(r1*nbal + r2*bal),
            g : Math.floor(g1*nbal + g2*bal),
            b : Math.floor(b1*nbal + b2*bal)
           };
}

function scaleBlink(w1, w2, h1, h2, balance){
  var bal = Math.min(Math.max(balance,0),1);
  var nbal = 1-bal;
  return {
          w : Math.floor(w1*nbal + w2*bal),
          h : Math.floor(h1*nbal + h2*bal)
         };
}

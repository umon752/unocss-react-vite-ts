//----------------------------
// 進入元素可視範圍淡入淡出
//----------------------------
// target: 元素
// once: 是否只執行一次
const scrollFadeIn = (target, once = true) => {
  const intersection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        // 進入目標元素可視範圍
        entry.target.classList.add('has-animate');
        if(once === true) {
          intersection.unobserve(entry.target);
        }
      } else {
        // 離開目標元素可視範圍
        entry.target.classList.remove('has-animate');
      }
    });
  });

  intersection.observe(target);
}

export default scrollFadeIn;
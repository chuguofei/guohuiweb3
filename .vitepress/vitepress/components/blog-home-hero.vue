<template>
  <div class="home-hero">
    <div class="title">WEB2已是过去式，拥抱 WEB3</div>
    <div class="sub-title">
      Web2是连接人与信息的里程碑，Web3则是赋予个人数字主权，重塑互联网未来的浪潮。
    </div>
  </div>
</template>

<style lang="scss">
.home-hero {
  text-align: center;
  max-width: 1280px;
  margin: 10px auto;

  .title {
    font-weight: bold;
    font-size: 20px;
    background-image: -webkit-linear-gradient(
      left,
      #3498db,
      #f47920 10%,
      #d71345 20%,
      #f7acbc 30%,
      #ffd400 40%,
      #3498db 50%,
      #f47920 60%,
      #d71345 70%,
      #f7acbc 80%,
      #ffd400 90%,
      #3498db
    );
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 4s infinite linear;
  }

  .sub-title {
    font-weight: bold;
    font-size: 14px;
    margin-top: 12px;
    color: var(--primary-color);
  }
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>

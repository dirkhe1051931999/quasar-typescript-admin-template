<template>
  <div>
    <div class="machine-wrap">
      <div class="machine">
        <div class="machine-roof">
          <div class="machine-silencer">
            <div class="machine-smoke"></div>
          </div>
        </div>
        <div class="machine-main">
          <div class="machine-body"></div>
          <div class="machine-back"></div>
          <div class="machine-front"></div>
        </div>
      </div>
      <div class="road">
        <div class="mud-wrap clearfix">
          <div class="mud"></div>
          <div class="mud"></div>
          <div class="mud"></div>
          <div class="mud"></div>
        </div>
      </div>
    </div>
    <p class="text-left">Under construction...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'ConstructionComponent',
})
export default class ConstructionComponent extends Vue {}
</script>

<style scoped lang="scss">
.machine-wrap {
  top: 50%;
  left: 50%;
  width: 475px;
  height: 145px;
  position: absolute;
  margin-top: -72.5px;
  margin-left: -237.5px;
  border-bottom: 5px solid var(--machine-color);
  .road {
    .mud {
      &:before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background: var(--machine-color);
        transform: rotate(45deg);
        left: 0;
        bottom: -17px;
      }
      &:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background: var(--machine-color);
        transform: rotate(45deg);
        right: 0;
        bottom: -20px;
      }
      bottom: 0;
      width: 40px;
      height: 15px;
      position: relative;
      display: inline-block;
    }
    right: 0;
    bottom: 0;
    height: 15px;
    width: 140px;
    overflow: hidden;
    position: absolute;
    .mud-wrap {
      width: 160px;
      position: absolute;
      animation: moveRoad 0.4s linear infinite;
    }
  }
  .machine-roof {
    animation: upDown 0.6s linear infinite;
  }
  .machine-body {
    animation: upDown 0.6s linear infinite;
  }
  .machine-silencer {
    animation: upDown 0.6s linear infinite;
    animation-duration: 0.4s;
  }
  .machine-back {
    &:before {
      animation: upDown 0.6s linear infinite;
    }
    animation: upDown 0.8s linear infinite;
  }
  .machine-front {
    animation: upDown 0.6s linear infinite;
    animation-duration: 0.3s;
  }
}
.machine {
  width: 475px;
  height: 145px;
  padding-bottom: 20px;
  .machine-roof {
    margin: auto;
    width: 80px;
    height: 60px;
    bottom: -1px;
    position: relative;
    background: var(--my-white);
    border: 15px solid var(--machine-color);
    border-bottom: none;
    .machine-silencer {
      &:before {
        content: '';
        position: absolute;
        height: 0;
        bottom: 100%;
        width: inherit;
        border: 6px solid var(--machine-color);
        border-top: 4px solid transparent;
        border-left: 8px solid transparent;
      }
      &:after {
        content: '';
        position: absolute;
        left: 4px;
        width: 5px;
        height: 12px;
        bottom: 100%;
        background: inherit;
        transform: skewY(-35deg);
      }
      width: 14px;
      left: -50px;
      height: 12px;
      bottom: -1px;
      position: absolute;
      background: var(--machine-color);
      .machine-smoke {
        left: -5px;
        width: 16px;
        height: 16px;
        bottom: 20px;
        border-radius: 50%;
        position: absolute;
        background: var(--machine-color);
        transform: scale(0);
        animation: moveSmoke 0.5s linear infinite;
      }
    }
  }
  .machine-main {
    margin: auto;
    .machine-back {
      &:before {
        content: '';
        position: absolute;
        width: 75px;
        height: 45px;
        background: var(--my-white);
        border-radius: 50% 50% 0 0 / 85% 85% 0 0;
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: -15px;
        margin-left: -30px;
        background: transparent;
        border: 15px solid var(--machine-color);
      }
      bottom: -1px;
      width: 75px;
      height: 45px;
      position: absolute;
    }
    .machine-front {
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 20px;
        margin-top: -10px;
        margin-left: -40px;
        background: inherit;
        border: 2px solid var(--my-white);
      }
      z-index: 1;
      width: 60px;
      height: 60px;
      right: -16px;
      bottom: -20px;
      border-radius: 50%;
      position: absolute;
      background: var(--machine-color);
      border-top: 2px solid var(--my-white);
    }
    .machine-body {
      height: inherit;
      width: inherit;
      position: relative;
      background: var(--machine-color);
      &:before {
        left: -15px;
        width: 30px;
        height: inherit;
        background: inherit;
        transform: skewX(-20deg);
      }
      &:after {
        bottom: 0;
        right: 15px;
        width: 35px;
        height: 41px;
        background: var(--my-white);
      }
    }
  }
  .machine-body {
    &:before {
      content: '';
      position: absolute;
    }
    &:after {
      content: '';
      position: absolute;
    }
  }
}
.machine-main {
  height: 60px;
  width: 185px;
  position: relative;
}

@keyframes moveRoad {
  0% {
    right: -40px;
  }
  100% {
    right: 0;
  }
}
@keyframes moveSmoke {
  0% {
    opacity: 0;
    transform: scale(0) translate(0);
  }
  60% {
    transform: scale(0.5) translate(0);
  }
  100% {
    opacity: 0.6;
    transform: scale(1) translate(-10px, -40px);
  }
}
@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

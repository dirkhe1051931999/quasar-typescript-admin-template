<template>
  <div class="dashboard-container">
    <q-intersection once transition="jump-up">
      <div class="col-12 q-mb-md">
        <q-card class="q-pa-lg bg-gradient-primary">
          <div class="row items-center justify-center">
            <div class="col-10">
              <div class="numbers">
                <p class="text-white">Wheather today</p>
                <h5 class="text-white">San Francisco - 29°C</h5>
              </div>
            </div>
            <div class="col-2 text-left">
              <img class="w-50" src="~assets/icon-sun-cloud.png" alt="image sun" />
              <h5 class="mb-0 text-white text-end me-1">Cloudy</h5>
            </div>
          </div>
        </q-card>
      </div>
    </q-intersection>
    <div class="row items-start">
      <div class="col-6 row items-center justify-between">
        <q-card class="w-p-49 text-left q-pa-md flex justify-between items-center m-b-24" v-for="(item, index) in count" :key="index">
          <q-card-section class="column items-start justify-center" style="padding: 0">
            <p class="fs-16 text-grey p-b-10">{{ item.name }}</p>
            <CountTo :startVal="0" :endVal="item.num" :duration="4000" class="fs-20 f-bold"></CountTo>
          </q-card-section>
          <q-card-section style="padding: 10px; border-radius: 6px" class="bg-gradient-primary">
            <q-icon :name="item.icon" class="fs-22 text-white" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="q-ml-md q-pa-md">
          <div>
            <p class="fs-18 f-bold p-b-10">Overview</p>
            <p>
              <q-icon name="arrow_upward" class="text-green fs-18 f-bold"></q-icon>
              4% more in 2022
            </p>
          </div>
          <div>
            <canvas id="chart1" style="width: 100%; height: 500px"></canvas>
          </div>
        </q-card>
        <div class="q-pl-md q-mb-md row q-mt-md">
          <div class="col-6">
            <q-card class="text-center q-pa-md">
              <p class="text-primary fs-48 f-bold">87 <span class="fs-18">m³</span></p>
              <p class="fs-18 q-pt-md q-pb-md">Water</p>
              <p class="fs-14 text-grey">Consumption</p>
            </q-card>
          </div>
          <div class="col-6 q-pl-md">
            <q-card class="text-center q-pa-md">
              <p class="text-primary fs-48 f-bold">417 <span class="fs-18">GB</span></p>
              <p class="fs-18 q-pt-md q-pb-md">Internet</p>
              <p class="fs-14 text-grey">All devices</p>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <ThreeEarth></ThreeEarth>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <ChartsLine></ChartsLine>
      </div>
      <div class="col-6">
        <ChartsBar></ChartsBar>
      </div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <ChartsBarLine></ChartsBarLine>
      </div>
      <div class="col-6">
        <ChartsBubble></ChartsBubble>
      </div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <ChartsPie class="q-mb-md"></ChartsPie>
        <ChartsDoughnut></ChartsDoughnut>
      </div>
      <div class="col-6"><ChartsRadar></ChartsRadar></div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row items-startm justify-between">
      <div class="col-6">
        <q-card class="q-pa-md">
          <div class="header row items-center justify-between q-pb-md">
            <div class="title fs-18 f-bold">Consumption by room</div>
            <q-icon name="help_outline" class="fs-20"></q-icon>
          </div>
          <div class="row items-start">
            <div class="left relative w-300">
              <div class="chart">
                <canvas id="chart-consumption" height="200" width="300"></canvas>
              </div>
              <div class="w-300 h-200 absolute left-16 top-52">
                <div class="f-bold absolute absolute-center text-center">
                  <p class="fs-24">471.3</p>
                  <p class="fs-14">WATTS</p>
                </div>
              </div>
            </div>
            <div class="right col-7">
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span class="badge w-20 h-20 b-r-7 block q-mr-md bg-gradient-primary"></span>
                  <span>Living Room</span>
                </div>
                <span class="col-2 text-center">15%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span class="badge w-20 h-20 b-r-7 block q-mr-md bg-gradient-secondary"></span>
                  <span>Kitchen</span>
                </div>
                <span class="col-2 text-center">20%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span class="badge w-20 h-20 b-r-7 block q-mr-md bg-gradient-success"></span>
                  <span>Attic</span>
                </div>
                <span class="col-2 text-center">13%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span class="badge w-20 h-20 b-r-7 block q-mr-md w-20 h-20 b-r-7 block bg-gradient-info"></span>
                  <span>Garage</span>
                </div>
                <span class="col-2 text-center">32%</span>
              </div>
              <div class="row p-8 items-center">
                <div class="col-10 row items-center">
                  <span class="badge w-20 h-20 b-r-7 block q-mr-md bg-gradient-warning"></span>
                  <span>Basement</span>
                </div>
                <span class="col-2 text-center">20%</span>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-6 row">
        <div class="q-pl-md col-6">
          <q-card class="q-pa-md">
            <div class="header fs-18 q-pb-md f-bold">Consumption per day</div>
            <div>
              <canvas id="chart-cons-week" class="chart-canvas" height="200"></canvas>
            </div>
          </q-card>
        </div>
        <div class="q-pl-md col-6">
          <q-card class="q-pa-md">
            <div class="header fs-18 q-pb-md f-bold">Consumption per day</div>
            <div class="text-center h-200">
              <q-circular-progress show-value font-size="12px" :value="81" size="165px" :thickness="0.1" color="primary" track-color="grey-3" class="q-ma-md"> 81% </q-circular-progress>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row">
      <div class="col-2">
        <div class="q-pr-md">
          <q-card class="w-full p-24 h-220">
            <div class="top m-b-24 row items-center justify-between">
              <span>{{ toggle_switch.value1 ? 'On' : 'Off' }}</span>
              <q-toggle v-model="toggle_switch.value1" />
            </div>
            <div class="middle">
              <svg width="60" viewBox="0 0 296 179" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter1_f)">
                  <path
                    d="M165.907 34.625C165.907 34.625 156.143 47.861 148.512 47.425C138.946 46.863 137.312 35.325 128.444 34.625C119.166 34.764 118.219 46.725 108.163 47.425C99.1529 47.264 95.3359 34.843 86.7469 34.625C78.1579 34.407 69.0029 47.425 69.0029 47.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M154.919 102.625C154.919 102.625 140.219 115.861 128.726 115.425C114.326 114.863 111.855 103.325 98.508 102.625C84.538 102.764 83.108 114.725 67.969 115.425C54.403 115.262 48.655 102.842 35.719 102.625C22.783 102.408 9 115.425 9 115.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M238.919 156.625C238.919 156.625 224.219 169.861 212.726 169.425C198.326 168.863 195.855 157.325 182.508 156.625C168.538 156.764 167.108 168.725 151.969 169.425C138.403 169.262 132.655 156.842 119.719 156.625C106.783 156.408 93 169.425 93 169.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M264.076 1.00001C261.378 1.03054 234 43.7744 234 60.3879C234 68.3648 237.169 76.015 242.809 81.6555C248.45 87.296 256.1 90.4648 264.077 90.4648C272.054 90.4648 279.704 87.296 285.344 81.6555C290.985 76.015 294.154 68.3648 294.154 60.3879C294.154 43.7744 266.775 0.970878 264.076 1.00001Z"
                    fill="#CED4DA"
                  ></path>
                  <path
                    d="M282.441 49.6635C279.436 50.5823 278.383 55.8514 280.089 61.4324C281.796 67.0134 285.615 70.7928 288.62 69.874C291.625 68.9553 292.678 63.6862 290.972 58.1052C289.266 52.5242 285.446 48.7448 282.441 49.6635Z"
                    fill="white"
                  ></path>
                  <path
                    d="M207.411 61C205.49 61.0222 186 91.4522 186 103.278C186 108.956 188.256 114.402 192.271 118.418C196.287 122.433 201.733 124.689 207.411 124.689C213.09 124.689 218.536 122.433 222.552 118.418C226.567 114.402 228.823 108.956 228.823 103.278C228.823 91.4522 209.332 60.9792 207.411 61Z"
                    fill="#CED4DA"
                  ></path>
                  <path
                    d="M219.337 96.8934C217.197 97.5476 216.447 101.299 217.662 105.272C218.877 109.245 221.596 111.936 223.736 111.282C225.876 110.627 226.626 106.876 225.411 102.903C224.196 98.9298 221.477 96.2392 219.337 96.8934Z"
                    fill="white"
                  ></path>
                </g>
                <defs>
                  <filter id="filter1_f" x="0" y="0" width="295.154" height="178.435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
            <div class="bottom m-t-24">
              <p class="fs-16">Humidity</p>
              <p class="fs-12 q-pt-md">Inactive since: 2 days</p>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pr-md">
          <q-card class="w-full p-24 h-220 bg-gradient-primary">
            <div class="top q-mb-md row items-center justify-between text-white">
              <span>{{ toggle_switch.value2 ? 'On' : 'Off' }}</span>
              <q-toggle v-model="toggle_switch.value2" color="white" />
            </div>
            <div class="middle">
              <svg width="40" viewBox="0 0 217 342" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_f)">
                  <path
                    d="M67 178.583C93.5097 178.583 115 157.092 115 130.583C115 104.073 93.5097 82.5825 67 82.5825C40.4903 82.5825 19 104.073 19 130.583C19 157.092 40.4903 178.583 67 178.583Z"
                    fill="white"
                  ></path>
                  <path
                    d="M67 188.583C99.0325 188.583 125 162.615 125 130.583C125 98.55 99.0325 72.5825 67 72.5825C34.9675 72.5825 9 98.55 9 130.583C9 162.615 34.9675 188.583 67 188.583Z"
                    stroke="white"
                    stroke-width="10"
                    stroke-linecap="round"
                    stroke-dasharray="1 66"
                  ></path>
                  <g filter="url(#filter3_f)">
                    <path
                      d="M61.6224 120.764C78.6362 111.727 88.2605 96.5543 83.1189 86.8741C77.9773 77.1939 60.0169 76.6723 43.0031 85.7091C25.9894 94.7458 16.3651 109.919 21.5067 119.599C26.6482 129.279 44.6087 129.801 61.6224 120.764Z"
                      fill="white"
                    ></path>
                  </g>
                </g>
                <g filter="url(#filter2_d)">
                  <path
                    d="M83.768 199.054L83.768 63.0005C83.768 53.7179 87.4555 44.8155 94.0192 38.2518C100.583 31.688 109.485 28.0005 118.768 28.0005C128.051 28.0005 136.953 31.688 143.517 38.2518C150.08 44.8155 153.768 53.7179 153.768 63.0005L153.768 201.97C162.845 209.089 169.677 218.673 173.448 229.574C177.219 240.475 177.768 252.232 175.03 263.438C172.291 274.643 166.382 284.822 158.008 292.755C149.634 300.689 139.152 306.041 127.815 308.17C123.7 309.262 119.422 309.601 115.187 309.17C102.415 308.838 90.0831 304.437 79.9858 296.609C69.8886 288.781 62.5533 277.935 59.0477 265.649C55.5422 253.364 56.0495 240.28 60.4957 228.302C64.9419 216.325 73.095 206.079 83.768 199.056V199.054Z"
                    fill="url(#paint0_linear)"
                  ></path>
                  <path
                    d="M57.7443 249.189C57.7443 257.029 59.257 264.644 62.2406 271.821C65.1226 278.754 69.2556 285.005 74.5247 290.402C77.1201 293.061 79.9789 295.485 83.0218 297.609C86.0911 299.75 89.3762 301.605 92.7861 303.122C99.8678 306.273 107.414 307.971 115.213 308.169L115.251 308.17L115.289 308.174C116.437 308.291 117.607 308.35 118.769 308.35C121.749 308.35 124.707 307.964 127.558 307.203L127.595 307.193L127.632 307.186C134.372 305.929 140.788 303.521 146.701 300.029C152.492 296.61 157.625 292.258 161.958 287.096C166.323 281.896 169.728 276.046 172.078 269.71C174.511 263.153 175.745 256.248 175.745 249.189C175.745 244.564 175.208 239.958 174.149 235.501C173.12 231.169 171.592 226.949 169.607 222.957C167.658 219.036 165.262 215.323 162.485 211.919C159.725 208.536 156.585 205.453 153.151 202.757L152.769 202.457V201.97L152.769 63.0001C152.769 58.4096 151.87 53.957 150.097 49.766C148.385 45.7174 145.933 42.0811 142.81 38.9583C139.688 35.8355 136.051 33.3839 132.003 31.6715C127.812 29.8988 123.359 29 118.769 29C114.178 29 109.726 29.8988 105.535 31.6715C101.486 33.3839 97.8497 35.8355 94.7269 38.9583C91.6041 42.0811 89.1524 45.7174 87.44 49.766C85.6674 53.957 84.7686 58.4096 84.7686 63.0001L84.7686 199.055V199.593L84.3189 199.89C76.3153 205.164 69.6443 212.384 65.0268 220.769C62.6796 225.031 60.8688 229.575 59.6449 234.275C58.3838 239.117 57.7443 244.135 57.7443 249.189ZM56.7443 249.189C56.7443 228.231 67.4872 209.785 83.7686 199.055L83.7686 63.0001C83.7686 43.6699 99.4385 28 118.769 28C138.099 28 153.769 43.6699 153.769 63.0001L153.769 201.97C167.757 212.955 176.745 230.023 176.745 249.189C176.745 278.544 155.665 302.975 127.816 308.169C124.93 308.94 121.898 309.35 118.769 309.35C117.559 309.35 116.366 309.289 115.188 309.169C82.7694 308.344 56.7443 281.806 56.7443 249.189Z"
                    fill="white"
                    fill-opacity="0.5"
                  ></path>
                </g>
                <path
                  d="M72.6179 250.554C72.616 242.091 74.9489 233.792 79.3597 226.569C83.7705 219.347 90.0883 213.481 97.6179 209.617V85.5544H139.618V209.616C146.888 213.347 153.032 218.946 157.421 225.838C161.809 232.73 164.282 240.667 164.586 248.832C164.89 256.998 163.014 265.096 159.15 272.296C155.286 279.495 149.574 285.536 142.602 289.796C135.63 294.056 127.648 296.382 119.479 296.535C111.31 296.688 103.247 294.662 96.1202 290.666C88.9933 286.67 83.0595 280.848 78.9288 273.798C74.7982 266.748 72.6199 258.725 72.6179 250.554Z"
                  fill="white"
                ></path>
                <defs>
                  <filter id="filter30_f" x="2" y="65.5825" width="130" height="130" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                  <filter id="filter30_f" x="0.122314" y="59.2585" width="104.381" height="87.9562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                  <filter id="filter2_d" x="36.7441" y="0" width="180.001" height="341.351" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                    <feOffset dx="10" dy="2"></feOffset>
                    <feGaussianBlur stdDeviation="15"></feGaussianBlur>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.501961 0 0 0 0 0.501961 0 0 0 0 0.501961 0 0 0 0.302 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                  </filter>
                  <linearGradient id="paint0_linear" x1="161.625" y1="141.948" x2="43.5768" y2="169.912" gradientUnits="userSpaceOnUse">
                    <stop offset="1" stop-color="white" stop-opacity="0.596"></stop>
                    <stop offset="1" stop-color="#F7F7F7" stop-opacity="0.204"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="bottom q-mt-xs text-white">
              <p class="fs-16">Temperature</p>
              <p class="fs-12 q-pt-md">Active</p>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pr-md">
          <q-card class="w-full p-24 h-220">
            <div class="top q-mb-md row items-center justify-between">
              <span>{{ toggle_switch.value3 ? 'On' : 'Off' }}</span>
              <q-toggle v-model="toggle_switch.value3" />
            </div>
            <div class="middle">
              <svg width="70" viewBox="0 0 306 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f)">
                  <path
                    d="M165.907 35.625C165.907 35.625 156.143 48.861 148.512 48.425C138.946 47.863 137.312 36.325 128.444 35.625C119.166 35.764 118.219 47.725 108.163 48.425C99.1529 48.264 95.3359 35.843 86.7469 35.625C78.1579 35.407 69.0029 48.425 69.0029 48.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M154.919 103.625C154.919 103.625 140.219 116.861 128.726 116.425C114.326 115.863 111.855 104.325 98.508 103.625C84.538 103.764 83.108 115.725 67.969 116.425C54.403 116.262 48.655 103.842 35.719 103.625C22.783 103.408 9 116.425 9 116.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M238.919 157.625C238.919 157.625 224.219 170.861 212.726 170.425C198.326 169.863 195.855 158.325 182.508 157.625C168.538 157.764 167.108 169.725 151.969 170.425C138.403 170.262 132.655 157.842 119.719 157.625C106.783 157.408 93 170.425 93 170.425"
                    stroke="#CED4DA"
                    stroke-width="16"
                    stroke-linecap="round"
                  ></path>
                  <path d="M220.25 19.4441L257.266 111.061" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M229.482 41.7656L207.122 31.8528" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M229.482 41.7655L239.189 18.897" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M249.223 90.6272L240.025 113.29" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M249.223 90.6271L272.091 100.334" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M190.205 58.6675L288.055 72.4195" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M214.151 61.834L194.387 76.2415" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M214.151 61.834L199.2 41.9931" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M266.338 69.1682L281.365 88.4654" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M266.338 69.1682L286.179 54.217" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M209.151 104.299L269.986 26.4342" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M223.866 85.1443L226.461 109.465" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M223.866 85.1442L199.208 88.1718" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M256.311 43.6169L280.536 40.2513" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <path d="M256.311 43.6168L253.283 18.9585" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  <circle cx="239.321" cy="66.5" r="8.5" fill="white"></circle>
                </g>
                <defs>
                  <filter id="filter0_f" x="0" y="10.9402" width="294.703" height="168.495" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
            <div class="bottom m-t-24">
              <p class="fs-16">Air Conditioner</p>
              <p class="fs-12 q-pt-md">Inactive since: 1 hour</p>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pr-md">
          <q-card class="w-full p-24 h-220">
            <div class="top q-mb-md row items-center justify-between">
              <span>{{ toggle_switch.value4 ? 'On' : 'Off' }}</span>
              <q-toggle v-model="toggle_switch.value4" />
            </div>
            <div class="middle">
              <svg width="72" viewBox="0 0 301 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f)">
                  <mask mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="301" height="156">
                    <rect width="301" height="156" fill="#C4C4C4"></rect>
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M150 250.825C209.094 250.825 257 202.92 257 143.825C257 84.7307 209.094 36.8252 150 36.8252C90.9055 36.8252 43 84.7307 43 143.825C43 202.92 90.9055 250.825 150 250.825Z"
                      fill="#CED4DA"
                    ></path>
                    <path
                      d="M150 277.825C224.006 277.825 284 217.831 284 143.825C284 69.819 224.006 9.8252 150 9.8252C75.9938 9.8252 16 69.819 16 143.825C16 217.831 75.9938 277.825 150 277.825Z"
                      stroke="#CED4DA"
                      stroke-width="10"
                      stroke-linecap="round"
                      stroke-dasharray="1 66"
                    ></path>
                    <g filter="url(#filter1_f)">
                      <path
                        d="M135.743 126.588C166.447 110.28 183.244 81.824 173.262 63.0298C163.28 44.2355 130.297 42.22 99.5936 58.528C68.8901 74.8359 52.0924 103.292 62.0748 122.086C72.0573 140.88 105.04 142.896 135.743 126.588Z"
                        fill="white"
                      ></path>
                    </g>
                    <path d="M182 143.435H122V156.435H182V143.435Z" fill="white"></path>
                    <path d="M6.5 151.935H124.063L151.927 133.325L180.5 151.935H294.5" stroke="#CED4DA" stroke-width="10" stroke-linecap="round"></path>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_f" x="0.5" y="3.8252" width="300" height="153.175" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                  <filter id="filter1_f" x="24" y="9" width="187.337" height="167.116" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur"></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
            <div class="bottom m-t-24">
              <p class="fs-16">Humidity</p>
              <p class="fs-12 q-pt-md">Inactive since: 2 days</p>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pr-md">
          <q-card class="w-full p-24 h-220 bg-gradient-primary">
            <div class="top q-mb-md row items-center justify-between text-white">
              <span>{{ toggle_switch.value5 ? 'On' : 'Off' }}</span>
              <q-toggle v-model="toggle_switch.value5" color="white" />
            </div>
            <div class="middle">
              <svg width="45px" viewBox="0 0 41 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>wifi</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="wifi" transform="translate(3.000000, 3.000000)">
                    <path
                      d="M7.37102658,14.6156105 C12.9664408,9.02476091 22.0335592,9.02476091 27.6289734,14.6156105"
                      stroke="#FFFFFF"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <circle fill="#FFFFFF" cx="17.5039082" cy="22.7484921" r="4.9082855"></circle>
                    <path
                      d="M0,7.24718945 C9.66583791,-2.41572982 25.3341621,-2.41572982 35,7.24718945"
                      stroke="#FFFFFF"
                      stroke-width="5"
                      opacity="0.398982558"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div class="bottom m-t-24 text-white">
              <p class="fs-16">Humidity</p>
              <p class="fs-12 q-pt-md">Inactive since: 2 days</p>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div>
          <q-card class="w-full p-24 h-220 row items-center justify-center">
            <div class="text-center">
              <q-icon name="add" class="fs-30"></q-icon>
              <p class="fs-20 q-pt-md">New device</p>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div class="full-width h-1 m-t-32 m-b-32 split-line"></div>
    <div class="row">
      <div class="col-6">
        <div class="q-pr-md">
          <q-card flat class="q-pa-md">
            <q-list bordered>
              <q-item class="q-px-none">
                <q-item-section>Icon as avatar</q-item-section>
                <q-item-section avatar>
                  <q-icon color="warning" name="bluetooth" />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>Icon as avatar</q-item-section>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="bg-gradient-faded-primary text-white b-r-16">
                <q-item-section>Avatar-type icon</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="bluetooth" />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>Rounded avatar-type icon</q-item-section>
                <q-item-section avatar>
                  <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>Letter avatar-type</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">R</q-avatar>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple class="bg-gradient-faded-info text-white b-r-16">
                <q-item-section>Image avatar</q-item-section>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>Image square avatar</q-item-section>
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>Image rounded avatar</q-item-section>
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>List item</q-item-section>
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="q-px-none">
                <q-item-section>List item</q-item-section>
                <q-item-section thumbnail>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
      <div class="col-6">
        <div class="q-pr-md">
          <q-card flat class="q-pa-md">
            <q-video src="https://www.youtube.com/embed/fThGKOgSo5I?rel=0" class="h-300" />
            <q-card-section class="q-px-none">
              <div class="text-h6">What Is A Quasar?</div>
              <div class="text-subtitle2">by Fraser Cain</div>
            </q-card-section>
            <q-card-section class="q-pa-none l-h-2">
              In this short video explainer, Universe Today publisher Fraser Cain investigates the most powerful objects in the Universe: quasars. In just the last few decades, our understanding of
              quasars has developed in leaps and bounds.
            </q-card-section>
            <q-card-section class="q-pa-none l-h-2">
              I love it when scientists discover something unusual in nature. They have no idea what it is, and then over decades of research, evidence builds, and scientists grow to understand what's
              going on.. My favorite example? Quasars. Astronomers first knew they had a mystery on their hands in the nineteen-sixties (1960s) when they turned the first radio telescopes to the sky.
              They detected the radio waves streaming off the Sun, the Milky Way and a few stars, but they also turned up bizarre objects they couldn't explain. These objects were small and incredibly
              bright. They named them quasi-stellar-objects or "quasars", and then began to argue about what might be causing them.
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row full-width q-mt-md">
        <div class="col-6">
          <div class="q-pr-md">
            <q-card flat class="q-pa-md">
              <FullCalendar :options="calendarOptions" />
            </q-card>
          </div>
        </div>
        <div class="col-6">
          <div>
            <q-card class="q-pa-md" flat>
              <div>
                <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg" :text="['hey, how are you?']" stamp="7 minutes ago" sent bg-color="amber-7" />
                <q-chat-message
                  name="Jane"
                  avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                  :text="['doing fine, how r you?', 'I just feel like typing a really, really, REALY long message to annoy you...']"
                  size="6"
                  stamp="4 minutes ago"
                  text-color="white"
                  bg-color="primary"
                />
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import _ from 'lodash';
import { CountTo } from 'vue3-count-to';
import { Chart } from 'chart.js/auto';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ChartsLine from './components/chartsLine.vue';
import ChartsBar from './components/chartsBar.vue';
import ChartsBarLine from './components/chartsBarLine.vue';
import ChartsBubble from './components/chartsBubble.vue';
import ChartsPie from './components/chartsPie.vue';
import ChartsDoughnut from './components/chartsDoughnut.vue';
import ChartsRadar from './components/chartsRadar.vue';
import ThreeEarth from './components/threeEarth.vue';
interface count {
  name: string;
  num: number;
  icon: string;
  color: string;
}
@Component({
  name: 'DashboardComponent',
  components: {
    CountTo,
    FullCalendar,
    ChartsLine,
    ChartsBar,
    ChartsBarLine,
    ChartsBubble,
    ChartsPie,
    ChartsDoughnut,
    ChartsRadar,
    ThreeEarth,
  },
})
export default class DashboardComponent extends Vue {
  private count: count[] = [
    { icon: 'person', num: 0, name: 'person', color: 'blue' },
    { icon: 'sms', num: 0, name: 'sms', color: 'red' },
    { icon: 'attach_money', num: 0, name: 'money', color: 'green' },
    { icon: 'local_grocery_store', num: 0, name: 'store', color: 'yellow' },
    { icon: 'sports_basketball', num: 0, name: 'sports', color: 'pink' },
    { icon: 'archive', num: 0, name: 'hello', color: 'blue' },
    { icon: 'swap_vertical_circle', num: 0, name: 'world', color: 'pink' },
    { icon: 'send_and_archive', num: 0, name: 'javascript', color: 'red' },
    { icon: 'add_circle_outline', num: 0, name: 'dart', color: 'green' },
    { icon: 'content_paste', num: 0, name: 'flutter', color: 'yellow' },
    { icon: 'line_weight', num: 0, name: 'vue', color: 'pink' },
    { icon: 'horizontal_split', num: 0, name: 'react', color: 'blue' },
    { icon: 'cancel_schedule_send', num: 0, name: 'angular', color: 'green' },
    { icon: 'shop_two', num: 0, name: 'weex', color: 'red' },
  ];
  private toggle_switch = {
    value1: false,
    value2: true,
    value3: false,
    value4: false,
    value5: true,
  };
  private calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    contentHeight: 'auto',
    selectable: !0,
    initialDate: '2020-12-01',
    editable: !0,
    headerToolbar: !1,
    events: [
      {
        title: 'Call with Dave',
        start: '2020-11-18',
        end: '2020-11-18',
        className: 'bg-gradient-danger',
      },
      {
        title: 'Lunch meeting',
        start: '2020-11-21',
        end: '2020-11-22',
        className: 'bg-gradient-warning',
      },
      {
        title: 'All day conference',
        start: '2020-11-29',
        end: '2020-11-29',
        className: 'bg-gradient-success',
      },
      {
        title: 'Meeting with Mary',
        start: '2020-12-01',
        end: '2020-12-01',
        className: 'bg-gradient-info',
      },
      {
        title: 'Winter Hackaton',
        start: '2020-12-03',
        end: '2020-12-03',
        className: 'bg-gradient-danger',
      },
      {
        title: 'Digital event',
        start: '2020-12-07',
        end: '2020-12-09',
        className: 'bg-gradient-warning',
      },
      {
        title: 'Marketing event',
        start: '2020-12-10',
        end: '2020-12-10',
        className: 'bg-gradient-primary',
      },
      {
        title: 'Dinner with Family',
        start: '2020-12-19',
        end: '2020-12-19',
        className: 'bg-gradient-danger',
      },
      {
        title: 'Black Friday',
        start: '2020-12-23',
        end: '2020-12-23',
        className: 'bg-gradient-info',
      },
      {
        title: 'Cyber Week',
        start: '2020-12-02',
        end: '2020-12-02',
        className: 'bg-gradient-warning',
      },
    ],
  };
  created() {
    for (let item of this.count) {
      item.num = _.random(1000, 4000, false);
    }
  }
  mounted() {
    this.initBar();
    this.initTang();
    this.initRose();
  }
  public initBar() {
    const xAxisData = [];
    const seriesData = [];
    for (let item of this.count) {
      xAxisData.push(item.name);
      seriesData.push(item.num);
    }
    var chartDom: CanvasRenderingContext2D | null = (document.getElementById('chart1') as HTMLCanvasElement)?.getContext('2d');
    // var gradientStroke1 = chartDom!.createLinearGradient(0, 0, 0, 450);

    // gradientStroke1.addColorStop(0, 'rgba(66,134,121,0.15)');
    // gradientStroke1.addColorStop(0.9, 'rgba(66,134,121,0.0)');
    // gradientStroke1.addColorStop(1, 'rgba(66,134,121,0.0)');

    var gradientStroke1 = chartDom!.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    var gradientStroke2 = chartDom!.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors
    new Chart(chartDom!, {
      type: 'line',
      data: {
        labels: xAxisData,
        datasets: [
          {
            label: 'Mobile apps',
            tension: 0.4,
            pointRadius: 0,
            borderColor: '#cb0c9f',
            borderWidth: 3,
            backgroundColor: gradientStroke1,
            fill: true,
            data: seriesData.map((item) => {
              return item * _.random(2, 33, false);
            }),
          },
          {
            label: 'Websites',
            tension: 0.4,
            pointRadius: 0,
            borderColor: '#5469d4',
            borderWidth: 3,
            backgroundColor: gradientStroke2,
            fill: true,
            data: seriesData.map((item) => {
              return item * _.random(2, 33, false);
            }),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#b2b9bf',
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#b2b9bf',
              padding: 20,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  }
  public initTang() {
    var chartDom: CanvasRenderingContext2D | null = (document.getElementById('chart-consumption') as HTMLCanvasElement)?.getContext('2d');
    var gradientStroke1 = chartDom?.createLinearGradient(0, 230, 0, 50);

    gradientStroke1?.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1?.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1?.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    new Chart(chartDom!, {
      type: 'doughnut',
      data: {
        labels: ['Living Room', 'Kitchen', 'Attic', 'Garage', 'Basement'],
        datasets: [
          {
            label: 'Consumption',
            weight: 9,
            borderRadius: 2,
            borderWidth: 2,
            backgroundColor: ['#FF0080', '#A8B8D8', '#21d4fd', '#98ec2d', '#ff667c'],
            data: [15, 20, 13, 32, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: 90,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  }
  public initRose() {
    var ctx = (document.getElementById('chart-cons-week') as HTMLCanvasElement)?.getContext('2d');

    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Watts',
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: '#3A416F',
            data: [150, 230, 380, 220, 420, 200, 70],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca2b7',
            },
          },
          x: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca2b7',
            },
          },
        },
      },
    });
  }
}
</script>
<style lang="scss">
.body--dark {
  .fc .fc-button {
    box-shadow: 0 4px 7px -1px rgba($color: #ffffff, $alpha: 0.11), 0 2px 4px -1px rgba($color: #ffffff, $alpha: 0.07);
  }
  .fc .fc-button-primary:focus,
  .fc .fc-button-primary:hover,
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: 0 3px 5px -1px rgba($color: #ffffff, $alpha: 0.09), 0 2px 3px -1px rgba($color: #ffffff, $alpha: 0.07);
  }
  .fc .fc-daygrid-day-number {
    color: #fafafa;
  }
  .fc .fc-col-header-cell-cushion {
    color: #d0d3d5;
  }
}
.body--light {
  .fc .fc-button {
    box-shadow: 0 4px 7px -1px rgba($color: #000000, $alpha: 0.11), 0 2px 4px -1px rgba($color: #000000, $alpha: 0.07);
  }
  .fc .fc-button-primary:focus,
  .fc .fc-button-primary:hover,
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: 0 3px 5px -1px rgba($color: #000000, $alpha: 0.09), 0 2px 3px -1px rgba($color: #000000, $alpha: 0.07);
  }
  .fc .fc-daygrid-day-number {
    color: #495057;
  }
  .fc .fc-col-header-cell-cushion {
    color: #adb5bd;
  }
}
/*!
FullCalendar v5.6.0
Docs & License: https://fullcalendar.io/
(c) 2020 Adam Shaw
*/
.fc-scrollgrid,
.fc-theme-standard .fc-scrollgrid {
  border: none;
}
.fc-theme-standard td,
.fc-theme-standard th {
  border-color: var(--my-grey-9);
}
.fc-theme-standard thead tr th {
  border-right: none;
  border-left: none;
}
.fc-theme-standard td:last-child {
  border-right: none;
}
.fc-theme-standard tr:last-child td {
  border-bottom: none;
}
.fc-h-event {
  border: none;
}
.fc-daygrid-block-event .fc-event-time,
.fc-daygrid-block-event .fc-event-title {
  font-weight: 600;
  padding: 3px 5px;
}
.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
  margin-bottom: 0;
}
.fc .fc-col-header-cell-cushion {
  font-size: 14px;
  font-weight: 600;
}
.fc .fc-daygrid-day-number {
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  text-align: center;
}
.fc .fc-toolbar-title {
  font-size: 18px;
}
.fc .fc-button {
  padding-top: 4px;
  transition: all 0.15s ease-in;
}
.fc .fc-button,
.fc .fc-button .fc-icon {
  font-size: 14px;
}
.fc .fc-button-primary {
  background-color: #8392ab;
  border-color: #8392ab;
}
.fc .fc-button-primary:focus,
.fc .fc-button-primary:hover,
.fc .fc-button-primary:not(:disabled):active,
.fc .fc-button-primary:not(:disabled):active:focus {
  transform: scale(1.02);
  background-color: #8392ab;
  border-color: #8392ab;
}
.fc-event.fc-daygrid-event {
  border-radius: 6px;
}
</style>

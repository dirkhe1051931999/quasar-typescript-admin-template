<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import * as echarts from 'echarts';

const colors: any = [
  'rgb(234, 6, 6)',
  'rgb(234, 6, 6)',
  'rgb(234, 6, 6)',
  'hsl(130, 50%, 45%)',
  'hsl(130, 60%, 15%)',
  'hsl(130, 60%, 45%)',
  'rgba(211, 236, 251, 1)',
  'rgba(207, 245, 251, 1)',
  'rgba(116, 233, 250, 1)',
  'rgba(13, 33, 85, 1)',
];
@Component({
  name: 'myComponentTopology',
})
export default class myComponentTopology extends Vue {
  @Prop({ default: 'chart' }) private className!: string;
  @Prop({ default: '' }) private width!: string;
  @Prop({ default: '' }) private height!: string;
  @Prop({ default: [] }) private link!: any[];
  private option = {};
  private chart: any;
  private initData() {
    const categories: any = [];
    const graphData: any = [];
    const linksData = [];
    let server = [];
    const major = [];
    for (const item of this.link) {
      if (item.type !== '0') {
        server.push({
          name: item.name,
          status: item.status,
          type: item.type,
        });
      } else {
        major.push({
          name: item.name,
          status: item.status,
          type: item.type,
        });
      }
    }
    const len = server.length;
    for (let i = 0; i < len; i++) {
      // 180 210
      const radian = ((2 * Math.PI) / 180) * 30 * i;
      const x = 550 + Math.sin(radian) * 100;
      const y = 300 - Math.cos(radian) * 100;
      graphData.push({
        name: server[i].name,
        x: String(x),
        y: String(y),
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACqCAYAAABCp8ZzAAAO4UlEQVR4Ae2dCZQUxRnHvTU+g0zPghyJYaaHG0+ikIcHTzSCJ9s9A8uNiBxZUAFRERQCnqBIBAXBG5FLV0A5VDS7ElAIIuD6MAhiyEIQ5JAFl3P/ed9kC3aXPWZ2+qiu/vo9qJ2jq77v//26uubr6urTTuPtFAUAXAigLoAGAC4H0AxACEANAOeesgO/wQoAqA1gGIDvUfF2GMBcADcDOIOV87kCAIIAJgE4VjE3ZX76LwDtfC6hP90HcCaAfgB2l4lGcm9+CCDiTyV96DWA6wGsS46RSr9Np7YnAVzgQ0n94TKAiwHMrBSF1L6QByDDH4r6xEsA5wEYAeBgamwktfcy+gXnE4nVdRNAOoAtSYXeui8fB/AiAE1dhRX1DEBTAEutYyGlmmigTgP2MxWVWx23AFQHMAHA0ZRCbs/OXwO4Vh21FfKEknoAegPYZU/sLa31bcp0KyS/t10B0ArAGktDbH9l+QAeAnCOt9X3sPVF16um2x9rW1ugSye3eDgM3jOdLmgCeBjAAVtD62zlnM12AkUAtwHY5GxsHWuNs9l2QQSgEYAljoXS3YYom93JLi19VS+AagDGATjibkxdaZ2z2VWlHcDpAHoC2OFK6ORplLPZyUIEoAWAVfLEUApLOJtdGUgAagF4HUChFCGT0wjOZpcGCcDZAIYA2C9nzKS0irPZBBJNCQVAU0N5S14BzmYzQMlTU2wP/wJEc4gBLCgmBv9ZdQX8czmE5gwDeAoAZV15s1YBdS+HFOV1ugLYbq1mXFspBdS7HAKgOYAVpRzll/Yq4P3LIUW3Ak8DQNlU3txRwHuXQwCcBeA+APvc0YxbLaUAHcAveWJyP4CbAHxbygF+KYcCdDmkv5ST+4tWr8iSQye2ohIF5LkcAuB8AGMAFFRiNH8snwIzXJ3cD6AjgP/IpwtblIQClM2m6cHOTe4HcBmAnCSM5K/KrwBls28tfaHb0tdFa+nQaL4qa+nILyFbSApYn80uWksn06K1dDhM8itA2Wy63JT6UjUAWgNYL7/PbKENClA2u3OVTmNFa+nMscEortJ7CiSezQbwGwAjAfzqPT/ZYhsVoHFvxdlsusUWwI82GsFVe18Bymb3pdkVJU5tAEZ73zf2wEEFFp0YZAPo4mDD3JQ6CnwY74X4V5Y6EXXakzhAhYWFPGB2WnlF2osDtPabTX6871yRELrrRhygDr0eJyv4blB3Y+G51rfm7UQcoOphA0MenYIjR2Rcl9JzuvrC4J/37EerdvefBIgguuHOoViXu9kXArCTVVfgo89Wo1GLu0HMnOiB6AX903Qz3hvt23+Qu6Oqa6zknj/8uB2d+zwV50TwcgpA4oPQ5d3x1qxPaJYhT91QEofEnSo4dPjY48/OwEUNO5SAh1gpFyAB0rW3DD6St33XxsSb42+qpMCCxSsKGrfsfQo4go9KARJffOK5mR/nHzi0VyVx2JfyFdixc09euw7Dj4r4l1cmDBBVULdpJzw/+T0cPszDo/Kl9/YnP+/+BYOGT46PhcuDpvj7SQEkdryy9V9AI3He1FHg6NFjePmNhfjDpV3LPV2J+BcvqwSQqCB21xhs+mGbOir61JOc5evR8s/3JgWOYCAlgKiSmg064K9jpyP/AN8W5jX+/p33E3pkjq0SOJYBJCqixNLc+Xynjxcg+rXgMJ6eMAu1G2ekBA/FPuUeSAAkyraxR7D+2x+8oKMvbZy3cDmateqTMjgi3pYDRBWLbDZdL+FNDgVyN/yI2zJGWAaOrQCJyimb/erbi3HsGC8P5BZGu/fmY+jIaQhGopbDQ3G2pQcSAInymnaDsGIlr/jiJER00L42YwnCV3S3BRwRW0cAEo31vm88tv33Zyd19GVby1fmgg5aobudpaMAkSOczbaP6bztu3D3vc85Ao6A0nGARMOczbYOpIJDhzFu4lzUbpL6z3IRn0RL1wASBnI2OzWQFn68Epdd28/RXkfEjkrXASIjKJs96hnOZieD0oaNW9G+60jXwBEQSQGQMIaz2ZUjtO+Xg3hkzGtIs+lnuYhFoqVUAAmjOZt9KkjHjx+nGaKINO/peq8j4kSllACRYZTNHjxiCjibDXy5egNa3/6AVOAIiKQFSBhI2exXpvszm719x270HTRBSnBEfKQHSBjqp2w2zfikmZ91m3WWGh6KjWcAEiCpns1e8ulqUI5M+Ct76TmASFDKZo9/Sa252d9vzkO052jPgCPA9iRAwng6UumI9fK2P/9XPPbkm6jRIOY5eCgOngZIgOTFbHZhYSFmvPspGlzVy5PgCO2VAIic8VI2e/XXG3Fj+wc9DY5yAAmHKJs9Z56cc7N/2rkXmUNfUAIcobcyPZBwSJQyZbNp2ZyJ0+bj4ku6KAUPaa0sQOScDNnspTlrcNUNA5QDRxyoSgMknHQjm01LoXTq/aSy4AhtfQGQcNaJbPaBgwXxGy3LWgpF2KFS6SuARODsymbPfj8bFS2FItpXqfQlQBRAK7PZa7/ZhJujw5Q/XZUFvm8BEmKkks2mpVDuG/ZSwkuhiDZVKn0PkAjmdbcOxrS3FoFm/FW20fwcyudQLyb292vJABUtLioAoIw2LXVyS8cR6NrvaQx4aBJozGT2GI027R/0/KUH4adVJQNUCiCrhPVLPQwQA5TSaZgBYoAYIL+cLmT0k3sg7oG4B5LxyPSLTdwDcQ/EPZBfjnYZ/XSsB6JJ4/Uus3e1LBkFdtommmOdOWwyrrnVmTtZHQPojm6j8e6SVRj9/Gw0bnlPSt2m00HxQnu0NtA9D0zE7IVfxHXuO3SSIxo7BpDZ64m4YwQROdl7yERXFkTyAgzJ2tgu4zG8OvuzE/qSxkoDRA7SP3K6bUfrl55NNgBe/f6l1/XHMy9mlQBHaOsLgISzT0/KwiXXuLfKltcAqtusCwY8MgVzF68sEx7S1VcAkcNzFq3EgGFTPLGggFvA0U0Cd3YfjTffyykXHHFQ+g4g4fgb72aDBtwklluBkrHdP7YZiPFTF1QKjtDRtwAJAZ6b+gFCV/RgiMIG2pjDKjxdCc2Kl74HaM6iLzFh6jwGKGzEH8U+8/3KT1sMUNGvMxKCAfr/Y9jpdLoudzMYoGJ5oOJHSll/T38vG3RjHm1eXfbEqnEUjQXFlrthC6ZnZSc0DvLlKWzGvM+x7MtcoVe8rNWwo69PY8UBIkFoWZhPstfgnfn/qBAkXwFEmen3F63AocNHSsBDLxigkz1QcXFoYao5C5bFT/Vl9eK+AWhGVnaFT/BhgMoGSMC0ecs20Cm/NETKAzQ9Kwdfrd0odCi3ZIAqBkgI9/kXuZgxb9kJkJQDyLjr8bhzMz9YjoWfrEr4KYYMUGIAEUj01J6shSviF6u7Zzrz2CfHrsa3bDsIs+blJL3yPAOUOECiN9q6bSea35DpyI8PxwCiZ3YuXvpP4WPCJQOUHED0jNSemeMcgYdSFY4BRI0RREMenYI9+/IZoATnYpf+GV+ecPQwFieekVo6v+UoQKJxehDs6+98BHK6so17oMp7IFrs4frbhjjW64g4UukKQMIAegLNqjXfVcgQA1Q+QDt27kW/we4+jMVVgARI/Yf8DbQEblkbA3QqQDKt+ioFQAQSLYE76ZX5OHr0WAmOGKCSAP192VpcfeNAV05X4oAvXkoDkDCqxU33Imf5+hMQ+R0g0iX/QAG25u1Et/7PSAOOiJd0AAnDemSOja84L177uWzV7n7Ubuz8I70T0VxagBIxnr9zcs6QW1owQAnmY9wKkOztMkAMUErjKgaIAWKAZO/mVbaPeyDugVLvgQK6cVTlo4R9s+/XWrwHCoaMNSyyfSKrrG0cIC0UjansJPtm08GhR3fEAaL/giFzePWwUchi2yS2YmMtTTfytUj6n04ARH9oofSbgrq5iSFiiCpiQAsZK2qEO9cvAY94EYkMPFerH31UCxsHK6qEP/MhZHp0hxYy7gZwuuCl3FKLdPldQDfnMCg+BKXU6Tagm0e0sDlei3SpVi4w5X2QFkm/PqCb6xkkf4Kk6eaStIaxhuXxkdD7sVjszKAeHaiFzT0Mkj9AorFwMBK9MyFAEv1SnQad0rSIMa162DzOIKkJkhY2D9AvchoLJ8pF0t9LixhXarqxnCFSCyJNN99Ja5hRJ2kgqrIDjcSDerR79bCxnUHyNkgB3fyqpm60qgoHKe+T1rDXbzXdHEcjdQbJWyAFdGNXWv1o31GjRp2RMgipVkAjdS1kLGaI5IeILp4HQtEX6l3es3qqcbd8fxq5ayFjM4MkJ0ianr60VqRTU8sDb2WFNIIP1jdGcDZbHoi0sLlFC5umlXG2vS7KZmu6OZt7I/dAooNYCxsj67XueZ7tAberAc5muwMQXYrS9Izf2xVXR+vlbLZzEAV0Yx0dtI4G2KnGKJsd0M2pnM22HigtbOwOhsxMOlidiqdr7XA221KAjgV1c3K1pjHNtYC60TBnsy2ASDeya4Y6XepG/KRpk7PZyYOk6ebWgB7NkCaIMhjC2ezKQbowbBZooeiYOs37nC9DzKS0gbPZZYOk6UZWrUYZ9aQMmmxGcTb7JEQBPf3bYDjaRrYYecIeP2eztbCxVwtH72/detRZngiWzEb6K5ttHqeZn7UisRoyx8Rztvkhm00zPSlH5rngeMlgJbPZenRbIGR29VIcPG+rCtnsgG4cCkTSn6rRJHaB5wPiRQfi2eyI0c2Lc7ODEfODmpGOuhd1V87meDY7lD7WC3OztXD6d5qe3la5IKjgkMzZbE03f9H06APNm/c5WwWtlfYhLWLcIdHc7EJNN16vGep0kdKiq+ZcPJsdMoe7OTdbixgrg6H2V6umra/8iWezQ8YsR+dm69EdwfpGz4SWQvFVNDzsrBPZ7PhSKJHos1VaCsXD2vrG9Hg2O2QOsGOlEbqxMuWlUHwTCY87Gs9mh4yXrZibHdCN7wMh83aPS8LmV0WBVLLZtNBkMGw+3KRJ7JyqtM37KKJAPJsdjrbRdGMmXVqobLB9YdjYQPkcvlquCABWuqG16FKtRn3jupr1TZNWrgjqseFaxBwUjMS61dBjbes0MBtZ2R7XxQqwAqwAK1BVBf4HEHmPpcjo++0AAAAASUVORK5CYII=',
      });
      if (!server[i].status) {
        graphData[i].itemStyle = {
          shadowColor: colors[0],
        };
      }
      let obj = {
        source: server[i].name,
        target: major[0].name,
        status: server[i].status,
      };
      if (!server[i].status) {
        obj = Object.assign(obj, {
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: colors[1],
                },
                {
                  offset: 1,
                  color: colors[2],
                },
              ],
            },
          },
          label: {
            distance: 30,
            show: true,
            formatter() {
              return '';
            },
          },
          status: server[i].status,
          animationDuration: 1000,
          animationEasing: 'cubicOut',
        });
      }
      linksData.push(obj);
    }
    graphData.push({
      name: major[0].name,
      type: major[0].type,
      x: 550,
      y: 300,
      symbolSize: 120,
      symbol:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAEqCAYAAADkjL6FAAAgAElEQVR4Ae19B5jcxNk/3/9L+dLxGQcIIcE+A8G00EtCIEAISWi+c+8F2xhsbI32XCDAQUgCARIIHUzvmOLbGa1tmgOhJITQIZTQTO+n0d3ZuM3/+Y129nTrLdqVtKvdnXuee6SVpr7zvj9Necsmm+g/TQFNAU0BTQFNAU0BTQFNgQpT4PMV7ZuuZgsGOSyxU/dScy8nZRzYZRmHd1uJo7tT5q8cRn7eQxP7dafIbs4Sc0h3x7zviRXtX6pwM3V1mgKaApWmwCrL/CGAwEkap3I29xqbmvdyRv7DGemyk4Yo9Z8zsoEz8hGn5FmbkXu4Ra5D2U6KjOyiZFfxqPG1SvdR16cpoCkQgAIQ2q5U22Gcmn/ilDzAGfmsVGAIml4CCzXetJNkqc0SZ3anEkd2dZy0eYBu6ayaApoCYVPAYfN24Iwk5NefkVV+BR+gwhl52qaEckZusC3zUs4S5zgWOY0zw+SUEM4S8x3L/K3NzNM5Nf/oWOb5DiU3pWctT3NG3uWUrPFTp8PIW5yS21E2lj5CiP8Jmxa6PE0BTYECFODU3Mxm5mw7OfeJokJLyUqbkSVYTuDr7yybv+PHHfO+VaD4kl4BAHpS877v0MRBnTQxDbOdTkru5tR4kVOyPl/7sNyxKbmVs8RULKdKqlQn1hTQFPBPAWxc2pR0FPrKc0ZedRi5sNtqO8JJLRzgv/TwU4rliW/wpeZPbWrOwaymEJhwarzMLXJ2j5XYR89GCo+FeKH9Kz3U2KrLavux3NBOtR0mx9sirY5FWrtZ4jdOKnEwNrYxI8UmeOES9du6o4AQ7f+vk5HhNiVP5vp6u3sK5AGHkhNWp9qa404Ae1l7Uw9NDHWS5K+ckefz9OkdgB9OdYS4/X/j3qco2sfvW9i/ayk5xGHG8ZyZf5YfDEZe4EnSmYtmxZ5xSno4I6/ZlNznUHJBJzOn81TbTwRt/3oU7ddlVokCAAxutU3ClzgXU4AJsPyo9Wm+szzx3U4rMYIz81pOzU+y+8oZ+Rgg083MPao0FJFXK56Y/mXMzBxGTpHLSkbeyqZDVL/l7JWSx7DExExFn4pFPtzRVdCTmrdvgf0LC/sJ9Tidx+zCscyfcYucxyn5b7awcEqew0Zwl9W2RRDqg3ZCiGlCiAeFEO8LIdYIIdYLITak/9cJIWwhxPNCiL8KIbYOUl+uvJyaP5L7VNRMckZ4dl+9v9MnVW9zatzPGbkKMwaeNM5yj9hJArNNThOTcSRuW+ZoWS4jZ8gNb0ru6EySB91lovGpt9xc9zim55TcYVuJMZ+m2r+dq+36WcwogGNL6FqAUbyDik1GTo3FOI2IWZMjbQ42cnGkyxl5oy89jHV20rC6GTkKMzO/jRBC9BdC3CWEWCtK+wOgvCaE+I3furLTyQ1tyxzNLfNqTo23vf1R95yR1TY1H5U8QMlCh5rDujoSu4S5nFiVnP8DLH05M8+1Kfk7ljCq/uyrBBFGFkE5MLs/+ndMKGBb5vic61dGluDrFJNmVqUZmCFgKs8ZuYzTvl9NgAq3jDbsnRRqnBDivDIAIxteACBPCyG2KVSXeidSs78K4U8fea/NIZireNJYgSNwbHKKFe3/p/JW6gpN4O5k2+7YSwEYc2p8kd1O/HYY+TcApx5nupWidaj14GiUU+P67MHizHgFat+hVlYHhbknComhUDDzzszSm3+LoL3q7aYQolUI8Xk2AgT8jWXNtUKInBu3nJH90yD3uXdcsZ+A5Qb2MrAkA7B42xqHe5zA4CNmd5BlXvqqfsgNbWaMKmWmF4d+1VUbui1jTxyfqkHB1RUA8yQISF11NoLOwM4GR7jYQPXS0E4a/3AePO/MDav5S+k9i4A4kTd7F/ZK0LVVycRAueeQtTfDqbFOKsxZ5rGdbEG/CMgQWZE4pXO1kDfetMYpHwAyssp1wbkp4J6Y9NW6hP0HjMly59BP81EAX26bmmNtSh6xKRE9T98i1n8Bma7I34Y1HzzX49xzSmZfSn6pKfk7Ni3rQd0eeyyuJjH5wAvQ6CdOw+qhj/l4K1bPpRp3toEZMy+uxho3VoQJ2BghxEyx7otVFYGLrErWr+kRq19KOTy1YH7P8pNDP4UJSJpQsksAkeYIRtYSzPwEG9WhVKIL2ZgCOG7E2rcPaidJZ3fKPGbj1PqJXwoIIWD7glOPOPytFkIk/La9FtNBI1meDmWd/tmUXKQ/fiGPKAgK7b8+oMHIO12WsXPIVTVMcUKIbwghrIj3McoFo5VCiH3reTCg0s6p+VIfntbL7fCGHDMNaAT2ITAjz9frlDY8yuUvSQhxihDii3KlukL5cHx7jxDiO/l7UttvpD0SI1dl8bbdxYxDa7tnVW691EGAAx3PnkYnJX/ThkflDYwQ4lAhxAcVEvywqoFm6hnl9bg2ckmzAdq79+Gqsptja6P1MWyl1NDzgAbO8eN4fh9D0vVpkhBicyHEIzFdlvgFmI+EEIf16Vgd/Vi1dME2UG1XH0n31CUxv466WJmuSI1GD2jYlDwuVrR/szK1108taXsR2I/Uwx+WL48CCOtnhHp7Al0Vu8N4SIGHvDJS17Ot3t6HcAd/CF5HNtLI6L6F/UMoumGKEEKMShub1QNgZPcBQPjXehxMzKjh7a0PeFBzTj32NdQ+wXqTs15lGbjNg5esUCup48KEEIOFEM/V+LIkGyjy/e4UQgyvt+F09/aMyxV4pJXiJtRbP0Prj9TVSBorPARbXc++JEIj3CabbCKE+LIQ4ua0iXs+QavH51i+POPXeC5MmkdZFuxZHEZu9sjCWngqi7LOmi3bpubvFKFwdah5XM12poINF0LMEkL01CMqlNCngsZzFRyO0KqCkyKbGkzJBGfEtmnbtqFVUA8FYWbh3deAR/B66FeUfRBC7CmEeKME4WqEpBnjuShpX6my4VXMu2HKLeMZ7WksTX1My+wk+VcGWanxIpRjKjU4tVaPEOJbQohlDbKPUQ7YYfnyihBix1ob21ztlWrqHgdGUFnPla7hnsESshc0yHrtNSk/CwghTk+76ytHoBotDwAEXsti57sj/wjnfgMP9l5HQbAQz52yQZ7KUxSP92l46G6QrpfUTSHE4UIIKEHpv9IpUBfGc30+sDDwXDZ3y5KYqJ4SO4zcmJltMPKudvLad3SFEFsKIf6hlyWlo0WOHDVvPIdAXBl5ocbivtzSIL/geKfPhqhFWhuk60W7ibN8IcRlQoh60frMIcdVeYTly721ajyHmDEykl9aqxoRBosyU70lsJl5i0JPxG+tt/6V2x8hxFghBK+KWDVOpTVrPIfwCxm5oWRlQ5liwPu4d7aBzZ9yBa1e8gkhfiSEeFEvSyqKXjVpPAev6h7waK8XGSjaDxm5XRmxUYMVzVDHCbDrL4RY3IBanxVFiAKVYfnyWC0Zz8EfjcNIN8ADimFYwtSxiLhdszsWDPbONhpZrVwIYQghquLrs4AgNeqrmjKe4xb5g5p1wGN93QMHOqk6DO9edd/hHB2EazwhBHb59V/8KFATxnNwaMUZ+QyyhNlH0PCeOdg0Po9kkGBKPlTAgajf8Wld9C3Bbr4Q4j69jxE/tMhqEZYvsTee49Scp2TJsczzo+fgKtXgWKRVdRSBkKvUjKpUK4T4g9b6zBLP+P+E8dx1+SLPVYWRPJXCboUz8i5kCgG4Ed3Q87p+bm1KlivggCZc/fQsf08QcFkI8Un8ZUS3sAAFYDw3Nf8oV+8NZ4ZZ1zK1yjJ/qDZFEc273rVEhRBbCSGe0MuSAuJYW6+wfImd8Vx6r6NLzjqo8WL1ICyimm2WmKuQkTNyRUTVVL3YtNbnlVrrs7ZQoYTWAkDujpPxnM3IJUq2upaSQ6ouBGE2gFPygOqckzIODLPsuJQlhJgkhHBKYEKdtHYpEBvjOalQmY4OB5+lcZGHwO2AB2fOyFo5nWLkI7gJDFxojAoQQgwRQryslyW1iwIBWv52HCLPqf1DTklP3fizkRHR05qinJFFMZL5QE1Ja33C5wOmr/qvcSmA8a+q8ZzNyLjeGT0ZGYix45LZZuZtqlPdLPGbuLQrSDuEEG1CCExX9Z+mgKIAjOfODMJX5eaFsRtmG5CzTkruKrec2ORz3b27Gm44a671aGxCiJ8IId5RnKKvmgI5KFAV4zkVk4UzsqrmrWbhd0PNNjopuTs2iFZiQ4QQ/YQQK/SyJIeY6Ee5KIDlS0WN57pT5jFK1pxUjS9XuGUeqzrDKSElymsskgshzhVCrM3FHfqZpkARCsB47qJKMHI6EpwDeav5vUR4ZVbAUWuOiIUQRwkhPi3CGPq1poAfClTEeM6mZjINHG9UAqwiq4Mz8p90R7rEivYvRVZRiAULIX4ghHhKL0v8yINOUwIFsHx5NsrIczY1ZqkP9Wq2YFCIYlG5ouxl7U0y9iWOYql5b+VqLq8mGDMJIa7VTnVKEAWdtBwKRGY8x62F2yngwDZBeZJQ5VwOTRykOuFY5LQqN6dg9TBiEkLAmEn/aQpUigKRGM9xarwp5Y6ZtxRk+ri+dCwyQwFHD00MjWM7hRA7CyH+q5cllZIVXU8WBbB8eTXMyHPYGIXccUZqc5+DM/PPCjgwhYoTcKSXJR0aMLLYWP+sFgUAIKEYz3lPMmHuESe589UWmxqpNPKtjpN9Stq25LNqcYiuV1OgAAUQGuMAXwKWJ1EXJbuqD7bDyM/zJIvvY87IaxI4LOOZuLRSCDFA72UUYFv9Kg4UgO7HvuXKDE4vlfo5HP2UW05V8qWVUdYDOBxGbq5KI3JUmvb5GQfm0G3QFChEgc9zsK/vRzY1H03L3o2+M8Uh4apkYmBmuhSjExUhxBeFRku/0xSICwXWrVs3olxZdpLkr3K2X2u+fTVwxIX9dDtqlQINCRw9qXn7qhlHJ01MKxc5w86nT1FqVYwar91PPPXS8nL5v5OZ09Mzjp5yy6hKvm5GjlLAEScfHN092oVG44lgbfb48mutZLnCi9MUJX81FawJswzV8O4U2a1cAoSd7+obl9UmF+lWNxQF3njrffH9ncaUrW3dk5r3fSV/nJH9w5ajyMpzkuRk1fCujpM2j6yiEgvedFCLeP3N9xqKCXVna4sCa9asFUePPVUMGNh6consnUkuHWilPYLBdWfmRdxvMru6jKwVov3/xaW9AI7Ntx8hHnv8RbFhA5T19J+mQHwo8FmnI0ZOPVOAT4MAB+QN0RLx8XYYOSUu8le0HZwa16PRnJEPiiauYAIMiPqfs+Biofc84iM0jd6SZfc/IXbcf1qGP4MCB4K6Sxmk5MoKiliwqpSDYmiPBisp3NwKNNS1/+Bh4k76kFi/Xs8+Gl1wq9X/V197R7ROPCMDGIo3gwIHZ+QyAEdNOS/2oF2sgkurQcm+/vhnM8XLr64E72gEqZYENVi93OkRp511vRiw3fCNQAP8GRQ4bGaeLoEjSR4M9/MbYWl2kixFo+2k8Y8Iqym56GzAyP49Zfa5wnF6NHg0mBBXsrvYW7vt7r+J7feekhMwFE8GBQ4EdpdLFUaeL1lQqpVBhXzEtVptyFWvGpRi12tuWobNU3hq0n+aAqFR4Kln/ysOa1lQEDAUbwYFjk5GhqeB4/1cshDLZzYlj8gZByU0Tg1Ug+Lnii8CBlqfvoQmNw1b0Cef2mLuSZeIpuZWX6AB/gwKHIjRLIGDkjVxksGCbbEpeTzd6DsKJqzwSz+AkZ1m2KQzxCefwU2C/tMUKI0C69atF1dcZ4kf7jLON2Ao/gsKHF2WsbP8eCcNIWj71yssauVVZzPyMBodtyBMalDKuV5w+d1i7Vq4StB/mgLFKfDQo8+K/X45p2TAULwZFDhWp9qaFXB8vqJ90/IkucK5bEruk42u4aWKGkDv9Qc7jxMP/+N5vXwpLjcNm2LlOx+JybPOLRswFL8FBY4eamylgMNZnvhuhSGgvOrspGG5jSZLyyshmlxqUIJeDx+2ULz/ofY+2LDokKPjq1Z/Ic65cLHYcsiowKAB/gwKHAhPooADIBKNRIVcKpRO3BlHvOKpBAWM7Pw4h//iCwQp13+NTAHr3sfFrgccFwpgKB4LChziUeNrCjhWLV2wTcgiHk1xcBeIRvOksSKaGsorVQ1KmFd8YZbf/4RevjQgckBp8Jjx7aEChuLNwMAhxP8o4IhblIG80svZ3Gtkoxl5OG+iKrxQgxLF9ae/MsQbKz/QANIAAGLzbnHK76/Nq/UZBn8FBQ6IF6fGOsihs8QcUgVxK73KjHVszHwehjGgxcowTr5UG8/VKXhAp+fmOx8Q2+01OZJZhpe3wgAONeOwadu2pUtxFXLAlBeN5oy8U4Xq81bpHZgo77XxXP0hx7+ffkUcesy8yAFD8WVQ4ECYBAUcPctP3jqvUMTphUPN4yRwUBIrn4dqUCp1hfHcf15ZqZcvNYwjH33cKWYvuKhigKF4MwTg+D8FHDVzHOtYpFU1GjFW4gJqalAqfYXxHOfdNSw+jdd0KPtdcjUtS+szDP4KATi+qWTws3vnfycuMliwHXxZ2wGq0d3L5m5ZMHEFX4YxoEHKgPEc1JD1X7wp8LeHnxH7/OLEis8yvLwVFDgAFkoG4/TxLijunJo/Uo2Oy46uY5k/++GO/o2MvIMY5j2M55585lW9fIkhdrz59gdiwvF/qipgKF4LChxYnigZhA/SggIbl5f8voX9VaOrHfgWsx9OjfvRnm12GhYLpgBzwHjuU208Fwv4wGnJ+ZfdJbbcIRytTyX8Qa5BgQO6G+B5TokTF1zw1Q6HkW7ZcGZM9JUh5ERewHDbQV5oau71ORpkUMPMC4bVxnPVw4933//Et4+MMMe9WFlBgaOHzts7zfdvhCxa0RbHGXkeDXeSxqnR1tS3dL7U/KmaYaQJ97pNyQR4Wy82WNV6v82u47XxXIWxY/XqNeLkM6+JzQw0m/eO+dXIC/tydmm/ulJth4H/7eTcJ0rLWeXUNjWTacFdVImmADAyVrnuFO09hxnHiyemf1nVnz04cfutjeeiRw8sS+iyx2SYjLiNv7c9T101awNn5IZVyfk/UPxbyrXTSoyQwNFBlpWSr+ppHcs8XzackXuibAwIy5PGnS66Yk1nfsItow1GPtn1egcmzvfaeC58AAFgwKP4XofMiu0sw8uTD1888/P0h3cVp+YfP021fzubnwv9VtEUHUpuKpQudu9sSk6UHafmS1E0TrzQ/hVOycLevRTC4dm5EIG9AxP3e208Fx54OF09Ygb5S00AhuLL7/1o+Kl20jR4knSmAeQjOCCGRqgfeeLUnId8DiUX+EkfmzTdVtsRLnCQnrCPg7os8xecGi+nCYop3SJOzc2KdV4NSi1dpfHcW++HJ0UNVNK69evFdbfeU1OAoXhTbY46qYUDOCNXcErWu/JkvtRtJY4uxutqxl9TkdzQKehvoKP4X2WZPyzWUT/vEUyXU2OxKpdT40WcnvjJizRqUGrxqo3n/CMeliVwNL3DvlNrEjTAnwo4FG8jeLvdYTzUy/vkAbtjwWD1Pvuq5IRbbZOy38X6NzYlOSVr0NHulPmrII2VZbHEfM5IF8rjjKwGkmK5Ukq5tQgY3jbDeG5xh448VwhC4FgaOjJeutXifTZwKD7HpqfDyFtSDijp4YwkhLj9f9V7dbUpeQxpqq1HpdpT0pVbxjNpQU+UlNGTmC+dt71NjadQjkss4/5yzYRrkYFytVkbz20MHWvWrhV/vuSOmgcMNd75gAOiIb17MfN09WFGVAGHJXbyiM0mNiUrIS+r2YJB3uc1cY/jJCnslnl1OQ3mjEzxzDI+hj5GOeWoPGpQ6uWqjeeEVN2HbQkcSdfLuKIfhYBD8TOWLyoqvQQRStoxO4fOEmdkLfZFvOoIKl/srzgWTc8U/llKY6WBDjNvS+cVNiW3Qo29lDJypa0nxvL25eobG9N47u13PxKHVNBHhpfmUd/7AQ7wuDxdTBpnKW9fABJsnsoPdsz84eSSyZzPlPYaZ4TnTJDjYQ9N7McZeUN2nBKH08TkHMnKehT1YFez/EYynlu16gux4PSr6mqGkc07foFDCYIrN8YrmY8tlvaUPKLe19S1y2rbQnWkmKdlTK8cy/wtplhunrlPlLuXkY9I2YNTj7/r2Xhu/YYNYon1cKS+PuPCE6UCB3geEdvgtpMzssH98Bovd3WctHk+eYj1c87IR+gEguDmayiWIfCIrkDGZubFUazN4sIUlWhHPRnP4XgVHsX3OPiEup5lePmiHOBQ8gWlLyVLcN8Jgzf1rmauNjWYRD+WOCdXo7Hr61HmWhXlubN3YBrhHsZzf3/suZr2/cGdHnHsnPMaBjAUXwYBDoRedWWOvJ++ro5SrnLJdeBnnJknSfTrMB7KLqzbMvbklHwo31OyEr+z04T5Ww1Ko11r0XgOntKuunFpwwGG4s0gwMEZeQ0y1dWR2IUzcpWUL2mpTv7qV2U9TLkrqyyHJg5Cw3Gs6lVU6WaJ36ijVoeRf2M/pKwKSsikBqVRr6effUPsI89hWfLEUy+LbfeMPgRBnPmgXOAQK9q/iT0OV97a/x/EA0piSmW9k5K/QY29BLGpTlJs2KgNTyAgWgHLPXV8ZCfJUnS2Eq2LM6NUqm0wnlt2379iuXz56JNOccy40xp2luHlgXKBA6cr6Rl8nxOVbkaOgjcwvIPmabbCWCXkr+Q67CT5FxosTX2p+TvZMXcWsqiSUyfvwDT6fZyM59asWSvOvuBWDRiDej3UlQscKjSJw8hGjoDw4e5VVzc/6WbmHiULcyUzqF1eTg3pY0CinmWeX8k2oK5GB4tc/a+m8RyWJfc9+KTYeqcxGjQ8oIFxGvabsReXIx82I5dAvvLpP+F4Fl7BZJok6eSM7F9OPRXJ46TISDXLkA1m5rkVqTirklyCo5+1iGoYz7319ofiwCMTGjCyAEPx433nz3zHuyeYxcp5f9qMPAwZ67Lafpwv0ecr2jeFfYsri6QrtoZwyjdANUEDRFSDoq+9U2IvLXY/aKZ48eW3It3/6Fm1WiROvVwDRh7AUOPx5KJZwqbmnHzCn+85Z8SG9XgxPags8FgV1II9X3vKfs6ZYQIw1D+vktdzdEANir7mBg5FF2k858D/Unh/69dvkC4BBmw3XINGEdDAOPx70QlrYKrRQ42t/AoftLNdOfPnoLgPeFDjC4eZLX7rijSdzYxRGfVXRrjsFDNvibTSAoUrwdDXwsCh6BOG8Rz2MTCLgSsAVa6+Fqf/ecak5ZAXOOQpwNJ9XuHkROZh5Io+Lwr8kAalatlCyZqupeSQAsmjf4V1E6fGFxIsKHmkhyaGpgnxaTlrtzBarBm2OMNm02jwHpNE6r7HSw5dCcB4/c336sKpTjZNKvF7i+1aT+WM/Acy07207dd++B+2XkjvMDLTT3qVxg0X6Z58wsdp1aIvrk61NWecrFLjTYSjEyva/085FsZZs2p0Ja+VGPB6rQMbqDiBeezxF8WHH3cKOM4BOKh/+PeEevh/XlkpLr+WiR33n6ZnGD6WJPn4BcexXcw4VH5sGXk9l9f+bNmxqZFC+h4rsU/2u2K/IaOZo1pG3qh4hHsAhE3Jk7LDlDhK6QsNtynpwHObkTOKdSSK9/kGST8vfSaiaRYtzZQeB6fkdilLFvlDIZnALB57IlC29AMyucrCSYzS5raTxj/KLSdX2UWfcWZcLsHB9TV6jDcDt8xj5TtKHvc+r9S9ZvZomV3TNzz6KuCQDroZ6YKHr0JLCBXyEcexQeQJG6SZfUlqLA47QkHOttmMjFOgAdP47ETdy+Zumdaj31ANfXnN2OExtqZltLRUwAEZ4iwxX846KHkgW6bUb5XGpqRdPSv3irCtSo4RDKrccnzlg6t2Nc3hjLyQb5qj1M8BMr4KDjGRZvZomV3TNzz6eoHDDT5mvgRhzhdTBTZfElyWmj8NKjKYZWSWSIxsiPSkRQV6hvJJFyW75mu8Y5HT0MFqhKbTjB0eY2taRktLL3BAlhCETAIDM17JVu6CvRcM2PCf/S6fHBZ7njZOlac68JiOk5dieUp+D714dEp2jJrzChXQnWzb3SUA+RjuAgulDfMdDHoG7tSqd/oD7PRrsIgWLLz0zQYOyEImRjJLzPXKRk9q3r5S/qjBvM+D3ks/piqCnEWuC1pen/w4tuHU+DQNBi8Us3aV0yBG3kV6dLhPYRH+gFckDRyVY3yvEOj70umeCzjkdgAl0Cj9zF7W3qTEhSfNBRI4sgBFvQ9y5RY5T5ad47AjSLmbOIzcrAr2ayyjTl4cRv4SqHKfmeF7AJuyGjhKZ2At9NWhWS7gALvDGTHkzRtM2qZEaplG4WMDe5Wcud7T4T84FP0OuPpToGGXoEoO71/Ixyl5rxLLFQVuGjiqIwQafEqnez7gQHD1tCHbWkQ5xJ4GDiU4I+/7/I6WnAzxmdURbScld5VcQHaGzE4uJT2lGOOkO/uxRM5U4uDscsP8jRAL8DYGh8iDdh6m9zj0HkdN8EA+4IBscEoWyg82JVR5/HIYuTFMuckuS810pMxa5s+y3/v+zVNtP5GNz5o2+S0AHoqQnzOyyG+ectJxy7xa1mOZx2rgKP3Lp2cL1aFZIeCQywdqvC3lj5F7XP6ONir9p6n2b8u9FVfzu3wlMzg9lQ2mxhfQbitVqJWmG7yClRp13m9dqyzzh25MTeOpVcn5P2jeRZ+qaCCoDhCUSvdCwAH+h3sKCRzp08xyZNCvHKl0TpKcrOr0a3in8sqrd7bBGbmsz8sSfqh4KvmUWkooKmdSaK/KjlrmaA0ctSEwpQpYvaYvBhzpwNJPux9v86WcAhDyw4875n1LnaDCHq1kdXROjevdBhvrioV2LNR2ZQaMoNKF0pXzDuEWoIyGOLQwAAJwDN5F73HUq6DVW7+KAQdkwqbGLFcOyX8r5aoiEyepSHTGjWQW58eckVXyS06N1EYJSngA0MFuLcztwyN69k8AACAASURBVA6RAAtc2UZmzkaTNHDoGUctgYsf4ICTH8nj2Cu0ot3jUGIt47ZQ8xMXsMyXfAOWzRJzVWMLxYNVFRW7dibJg7I8ao4tltbve5Ga/VVEiOPU/ASqs8ingUMDRz0Bh6tfIY9hV0shZuS1YsqXfuWnWLqMwlkJToY24dR40UUb41MIaLFKir3PmNonDatYWr/vMyrwHktBAMe2eqlSE0eRtSTgUbW12IwD+4JSDi3zak7JAy54JKb6lZEg6eSqg5I1qNPXNoPD5u0gE7sZLgpSucoL4xksfXD6gZgP6nmQK2fkabdMczNVjgYOPeOISsijKLcYcKh9xi7LONwTZvWNsIzclNzku9qUUBesyCoc1eZLJ597PZY7ISpu9ZrwmicVbICPl07KONDtkHmtNzmAY7td9XFsFEyuywwflAsBh1SgpMbnOOFQQGF3GA+B7zuZOd3L91HdwxG5mkRwVmSmo0zn5WZmCMsU1aluq+0INAI+D31vtqjMWVcYs6Es6Il4X2ngCJ+5NWBER9NCwNG11PwleNyrPKn8k0oZeqH9K17ej+Jemt2nY9FinzJvHe5uatpreZIszZuwjBfpM+k3QAy4eC+jCJllVTIx0I3KTf6VXQaAY/td9XGsFvbohD1M2hYCDmUkCgDx8rlNzUddQCkyA/BmCnDPGbkhDWAb8qpldKcSRyKRTEgJCVBfzqyckYQsn5LlORP4eKhMgHPFzdTAURsCE6bw1XJZ+YDD9QZmfCpPDFe0f8krFtjvcOUTx6TR+7pB9LcMJlhGm7ctmXuvH8Ioolx3sgX9sASSVngdCwZnKvZ5I4+nEEQX675Hja9lZ5PA8WM946hlYWqktucDjt74ROTKbB7HbxVQuhJR2dJqD+7pSr5ViFI2wVIgl2Dm6kSpz9QUDDOHUvPaljleom2egNYaOPSMo5aAJx9wwKwdfO7ksVD1BHj/Z6kyVE56h5F/u7Mc4uTUI+HUdZbKKflvORX4yQNHJG4jcs8aCpUBozvMVhAMKlc6DRwaOGodODArR3REDmUvIf4nF5/jcAFmFhJcGPl5rjRhPlMfe9SXfSCxiVwGpH0PIqhSmBVnl5VRZqGJydnv8v2GSzU03O4gy/KlAXDssJteqtSS8DRyW3PNOBxqHicBIWmcmo/P8RxR7qU8BNgvLFS+951HgVM4FpnhfbeJmgmgMVHHWehOmcfITic3Phnp0yjPD26RP8g8zBjledznVgOHnnHUEhDlAg6bkkcwq857gpHm+PQJ6OeQCURn6yMIIf9A+a68Si3SvkqhSqnKFc6+HpZDbscm3qlW91Jzr2Llp9O/i1i1CD+ZLz2AY8juesZRS8LTyG3NBo7VbMEgyB9m5Pl43PscH3iZ3jKv9j4P+z4dmqEHdW2kz9E7C6iMFR63jDaXSMb1xTqqlMc4I1cUSquBQ884agmIsoHDZokzIRM2JRMK8bl6190x73vp/ZBV8FOqnkdx5ZbxTLptK/uUr4FDC10tCV09tLUugCNjbRp2bIU+8NT7w6PTsbbYek6pmPMioe8w49hRL1W0dWyNOGv2Akd6OfCejNS2PPGNXkkpfAcHxnLmzoLbgBWqSbnGgKFqn9OevsZtxoGFCgnrXeaYh5FL8pUJa1rOyFo/R8QaOPSsqZZmIl7gcCzS6gJA4eV4tpxwRvaX+ajxdk4di+wMZf62qZmUSxXol6QWDsgUk3HxJ89qE/tlXkR440atMtbB/R+i3OeqyqbkRDQYWq253nufaeDQwFGrwGFT817weTknJHAxgbydVmKEVx7CvFc2K1IWl5hDMmVzas7DQ9n4LMOaTKIIbpTPAZ5HGzRzPJVMDCxWvQYODRy1CBxQaJRmGJQ8UozHc72Hmb2UXUr+nut9GM9UqBPU050iu2XK7OMuMELkylSYvkGkKqi4y0jc9y3s733fs/zkrUHQjY6AvIk89xo4NHDUInBwav7JFfzyXGuK5YlvQFVBfvQ7Ert4RCK028yJD1YkVmKfTMHQCJONl05RzWMzLypwo8I32sw83Vud2ndxKDnB+zzfPYBjpz20HkctCU8jt7VpYMux0hKWkY8RszVI7CEVhQ3XfPIR5DlnifkZfPAeUvQ5jmWGGaSSUvM6S8whctbByGeI66Dy25Q8jhkHzqvVs0JXDRx6xlFLQNQ0sGWqTc2xEEhoRhfi7WLvlMtPRGIrpCRZrJx87/FRV8DRZx8G0w/1AmEH8hUQ1XObmbdJArLEfNQBhz2yPSWs+wAcO+8xXB9H1shxZC0JeRRtlcCRnPsEPpqISBhUtpSTH9tKjAlaVnZ+h5ILFD70UZ+A0KkXtmVemp0x6t9dlrEzZheckQ9cvxvmAgkkJTgU0sChZxxRCHhUZS6YMuEs8Dj0lMKQL7VJ6ldlvZQ6OTOvVfgA5+OZvFDqQIxX+ZKSxzIvKnjDk8adbv3GLISfw30fdCvSFgDHLnvqPY6oGF2XGy4wP71o1lPgcYRbLcLavl5nogkUcD3hq6AciWxGlsi2wldPtrm/OkvmlPQEdSico+6ij5QVHlymoZFwIFI0kyeBBo5wGVsDRXT03G3v4TBmW2+H/JFWBw1B90w8YiVvla0Kp+S97HebZEzXpSKKsfNGCSrwAL5AABoS3UpUo9XAER2jaxAJl7YXtk2RPB62+7+uVNthUn4oWbnRzKBM+ZWOximR1rE2JfdtVEyfk5UKxanMbgR8nSrgwL5H9vtCvwEcu+6lN0e1kIcr5GHTc5udhokP75wr3r19zgdhOxx2hdx4W354l7UdUEhe/L7LHFRgFUDJBRvl66HGVkpooSm2UYIKPEi7TluHdkANvpQqNXDEW2DCFsBaLe/kGRPkbOO606beUAp/+03LLXK2lOOQDjm8ns438gCmGoU1jAse/r1zqbxhXB1qDlPgBW3SLqttC7/lAjh+vNcIfRyrj2NjywNbbtciXr/pRPHmLXPEtru2HueXt0tJp2btMrzCE9O/XEreXGltStozMplvI9eh5CYkwtFoGGfLuRpS6Bmn5EpZPyXPpdtR0HmPtywNHHrGEfdZiDl5vJxttM+cKKDH4eXfMO9hTQ75gROsoOUqk/qC0R27l7b9GhW6wmvOC1ppqfkR3g7WsjiG5YxwTo118IfqpxwAB3ar4848un2NCXCbb9cqXr3xRPHObXPFD3dsjRY40j56ccriR3bypYEWKuTRxYQC0R2lQxFGPpIJKXkyX4FRPOfU/JELWK7PxYzFbgHP5t52aOBoTIGsFSA+ccI4+UH+3QkT5cctyhlHRrWBka4gMZIQeN4FDekLtXB0R68JLbcWbucVzijvlct3tSnqhsJzp1zZMTRztUMDhwaOuILId7drFS9dNxsnKXK2gXZGCRyQD86MVyD0OC3NJS9+nnlVzYuecnrtVvw40PHTAD9pbGqk0NEe2utISB0Rc0qeK6aUBuDYfR+9ORpX4Wnkds0c6842zpw1KbOUjhw4ksbv5Qyemdf6kb/sNOnoAu/LMvwGaeOMvOpWarwS9llzdgPxGzEq03FlebYLNE6N+9EW6OLnyqueaeDQM444gtNmg1vEC9fOEu8tniOgw6HaGDVwIOqaK/TmJ8U+ukqGvNcuZhyK/Ph3GDnF+y7vvZMkJ6tMUbokUw3oWkoOkfVRQtUzde3qSOyCTVJpALei/ZvqefZVAsfeesahGFNf4wGkM8aOlcL3h9m9sw2MTdTAIe3PGPlACj5NHJQtL8V+c8u8GnnlCWty/g+KpZfv0wYzn8mMlDwblvpqvsphyi+Bg+UOBsUZuSz9/sx8ZWjgiIegaMDqHQecpLx8/Wzx/uK5YuBOrZnZRiWAA3KihN+xzPPzyU2u5/ay9iasAKTM5VIzz5VJPePMPElmdPcdhqrnUVyhA4+68m3AwLMy3KPBAA8AkasNeL7HPvo4Vgtur+BWmxbzprp6G6cf756keNsT9YwDMgJbGMgVp8abuWQm3zPvisNJkZH50uV8LuNTMvIxKi7VUjVngXkepjdhuAzxmG2y68nDKSESyKiZ9DzO3GrgiI/AeAWkUe9/sGOreOvWOVJTdKsd+s42QJNKAEc6xuwXUoaXzd8xIywFbtLuDN1NUUZeLWd/ZBPOSEIKa0haaLnaq86cYdaf6716Jp6Y/mVOjZddIDNb1HN1BXDsua/e42hUQY1bv38/a6Lc25gzcXyfJYpqZyWAA7JhM3KPK8OmoWSl0NUbnI2zRHnarYK2f50zotDn6ewTj0IN8PvOYcbx6BhPGr8vlscTR/adT1Pt3/am18ChZxxKKKt93XYX1wL2uWtmiQGDc49LxYAjaRoSOHwoUuJ0E8sa9+NM3sLH2itjJd3Dy7iLWFJ7bGFJmX0kVsFeuq3E0T6Sb8IpuSPdsT4WvBo4cjNotYWoEeu/aJ7rb2N865icsw3QpFLA0UXJrpAX6aArNfurhWRMBYNPy9fMQmmLvoMeh83Iw7JyRlaFrU3KGXkNZeeL5pbdQFjMws0hPCjhrFq9B3DspZcqeRm1EQW4Gn2GhfanSwzxyCXHFxyLSgGHPJZNe9WDboaSl+wrTlKU+1CpcLmi/UvZaUr+bdO2bYFYEPBOSv4W1vEsQEACEjXeLqVRWHshn02Np9TySQOHnnFUAyiy61z8+2lyb+PIw0fHAjggV2qWjuBP+eRMxWaBXDll6H3kK3eTPtHeimhx5i0k6wWWJxI4ksadWa+K/lQapdjARWIAx9776c3RbEbWvysHqEf8cpQEjSVnzygIGhiTSs04IBtqHxEf2lyCBTMP6QMVH2Nm3pIrTdnP5JKlw3jIFXTSCY9hZReWzghbGFleOp5KKeXJmJuU9HBGuuA7RANH5QREg9HGtIZq+b+uOF4uU3b3ocFcSeDwWJ6vzz5USG+IvijlkBInDLneSI4hrB6NskeChK1D4Zwai9HgQmuvjRrheZA5LqYGA3Dss7+ecWih3lioK0GTuRNdZa9z5vZVLc9XdyWBQ8pa+nQ029Icp5mQQRc4EpM94hXubZ84s8y4PEjpnJH/oMF+wzxm1wXlFDs59wnZaWaYGjiqIzT5hKNRnkOdfOVtc8RrN80WWw/ZWNkrFx0qDRydlNwlAYKav1NyxBnZnzOy1gUNcod6HtnVZuQS2QgfVqv5GiG9C7nGa3a+NH6e47gJnceSRQOHBo5cQhr1MxXuYProsUX3NlRbKg0cKnA0TxorIFfSjIORd9yPLnkHpyp+5C1QGpxk9AZwMr4AcpVaYHeK7JYGn3+Wmjc7vZpu7fMTvVRRjKmvlQFRfKw+7zDE3y+e6Rs0MDaVBg6clKRnFj3Y11AapdgUhXV6tkxF9vvzFe2bcmq+lG7Me6UuN2xKJrhoV56jEW/H3NmL+ZIGjsoIiwalXjov/8txcn/gkINHxho40nYrMvSITc1k+qMtoPTllaWK3Lv6HcanaAQM4foEpC3SAs4S57jA4UaoL5K86Gu+rO0AvVTpZWgt3NHTYtoo19fGVb+dWhJoVGPGAQFSoRx7QYNcV1SwokrgMPJzTska2RhKHvu4Y963/NRlJ8lS5PGrau6nTC0s0QuLprFLY2yIIj4K/rN9bfihUaWXKpAfzsgiBRo2NR/FksWPXEWWxmbGKHjpko3qMB6CcVyxypSqeZgq7H4GTKfR4BIGD1xzyrFyiXLsqHElzzZQf6WBA3uKnBHXORcjXV0dJ21eTEYr8r6TkeG9RzvG/dh3yFdxOsblF5ipKJXxfGlLeR4GQ+gyNLAU44FfHzZagsayPxfXEM1XViWBA64rOHW3FPBxx0e+kHyWInOhpIXHocyyJUmW5psKqTi1pXomKtbIfIOkn2swCIsHNt+uRTx91SzxyV2GCOJVv1LAIdUV0kZuaS966+UWQbJt92LyVNH33YwcxakhvQ4h5IFYnvhGdgNwfCuXNZQ8kv0uyO+wmEOXo4EmHw8goBJ4F2Ec86Xx87wSwOE6+jY/kbMMRj5KL1feSMvehCCyFknebpb4jQodh9OWbJN52zJHy85QY3GYDfAzYDqNBoVyeQBuGz652xBPLpolEGSp3HKQL2rgQOhUnnb9yanxNuxVIGvqUKKQpWyYMllyWdCJR8T5NLqt9MaA5ZQsxPNSvS8Xa0SQgdR5NaAU4gEYsUHJC3x72CGl6WzkKjdK4EiDhgzlihhJ3gDykDkpk8kCsWCLCVrU79MdeB0N5YzYyphNhTsIW/kk1wDpZxoQwuCBU49zlyh/JpMDzTRUW6ICDgSOx16GlDlKnoXPG6+cO9Q8zn1Xmg8cbxkVuefU3AzOf9LgAZuSKWq6ZFuJMWE2Qg2KvmqwCJMH9v/pSGku/9SiE8QWAZcoql1RAAc+xBm/GknjH7nsT6B3BVnEP7RJw5S/0MuSHsqZcblqcGb/I2UcGGZlalD0VQNHWDyAvYx/Xna8tEc5+KDgSxTVrjCBQ5pcMHKDki98mPOBAvYbVbp8cYzClMlQyrKpMUvpeqDx3ZaxZygFpwtRg6KvGjjC4gEV5uCsE4OdomS3JyzgSAPBPyFPcrZBSXuheM/p0JCrpfwxclSY8hdpWV2W+QuFeFweESWODKvC7MHRvzWABOGBgw4aKWca8OwF/Y0gZWXnDQM4upeae3FG3nVBw/i0yzIO9yNLSmvbpuYcP+ljkQaGcAo4MlfLvFQ8anwtaAOzB0f/DpfZG4meiPuKY9fPlhjigJ+Ft0RRNAwKHJ3MnM4ZWSVliJLHvScnxeSoM0keRL6wTzWL1Rvofc/yk7dGo3FUi/i0SlkM3sCgoBKkcDUo+qoBIygP4PQEfHrGCf5cAZZaX7nA4WpduwaiEjTw0S3RWM1h5EaZl5KOIPJW0bw4opXAwcgHqFhqtzHytHxG4RQoMb9c+5VSB0+n1wCTiwdajnBtUR6+eGbeSGy58pXyrBzgsC1zvIp9In3/Wub4coSXJ42zpLxZxjPl5K9KHqVuzhl5XTUApy42NX+nNk45I0/3WIl91Hu/11IGTqfVoJGLB7bfdZg0lX9v8RyB4Eq50oTxrBTgcJYnvttJyd1ylgB3nUnyYBCrchxSeD/efuWrqum6U+av0o1+PrshcrOHGspV+3qbmReX4hwojAHVZTQuoDQ1twhYvII/Jw337z+0HJ7xCxyORVozquNJ0om9jaAB0ZwUGZmWwbVBy8qW4ch+d1qJEWi0TcnjuSpByAUsV+B8WHaOkvdgsp8rbfazcgZQ52lcoMgee6Uduujk0j16ZZdV7Hcx4IDGp8PIzVJW3AiKd5XqnjNbPtTvrlTbYarcXEpiKl2srjY1x6LRmG4ValhPat73OSW3ZzpIyXLshxTKU2yw9HsNEvl44LBD3aPXJ6+aJb63fTADtnx1eJ/nAw6cLjqW+Vtl58UpeQ+zjkJ8X+o7xFxWcsWXztu+1PxVSZ9xUpx2016sEbBvUfFXoODC2dxrACq58nkHRt9rkPDLA9vsNEy8fP1s6WMD6uV+8wVJlw0cWDLIjyolKyHUnJENnJIr4RQ8F68HeYb9kV7gMH8apKyK5XVtVdzg1X4rlSrrlBCuHJIg9GPS+H12OLsgA6nzNi7QLP7DdLmvgWhsleIDL3CkDwyk9qcU6A7jIcRz9SsfpabDZqsCjh6aGFpq/qqk76SJaYo4pTYAQGEzckZmGsfIRzYlJyo3aJUadF1P/YBM21Q3dCPAo5LjCuBYtXTBNjYzb1NCzCl5tttqO6JUuSg1vTzFTBu6YQVQav6qpFdmvTYlfy+3AUBMh5ILPMpj7yOObCXWppVkLl1XtAAF36EIpvTcNbPED3eMfl9DjeeQ3YeJBy6Yea8y9uSMvAEdjUI2JuXKSr58yooWIV3zpYnVc4eRmRJhGXk4aMOA2NjzUPofcFV/yowJ4gcVZALFDPoarZCHTd8dd3f1NT68c67Yr0IRAPfcd4TAic2nS9JBnuWM2ZwTNHh7OXKkPro1Y6/CaWJyemoWOPSjIhgi1WMGAiZA2e/ePkfAqrF5l8p9RcJmbF1edEAEO5RHLjle8srEiPU1MI4/P2iEuP3MabI+xZ/s3OM6/MYgUnwe5lVqnspN2HACooXZtpxlefyNvpgzQYCHCIxz+vETpeYfBgj+IW847ViBozYtiNEJYq3R9upTpkohDsubV77+H3X4qIxCGfjxhWtnCXPyePH9HVoj9zlaTIzgkQ9tsilpL5Y2Fu+7U+YxaDAcqIbdIDWA2OvAAD1/7awMyj9++fFi9oRxctBUOn1tPDAxJrqboYj5Cj+iYfMAZjPQOn30UndGA15/4K8zxZihY0T/wb0zYO+pSthy4Ke8THCmpHGWn/RVTwOfARI4kqQz7MZkMwFUiI/+1Whx25nTpHk06n1/8Vxx8fzJYt8KrWuz26R/hy+sfmkKJ8Mwk4fORtjLWOh//DUxRay8bY78WGHT9eYzpol8XsNiABwfSzm0yNlhy2Ek5Tkp40DZYGqsC7uCQgy03a6t4uQZE+R0EfXj//4LZsqvA74ShfLqd9UT9rBoj83Q1286USp5wUFPGOXiJAazWLVfAp7C/tp5ZLJAfYXqiAFwcCkHLHFm2HIYSXkIR6cEN1ewpiCVFhoo9U7NQm79Xe8sBJaQ1596rBh+5OjQPT2pevW1euCz9ZBWgaUq+A4R5oOOxa9+MVJcd+pU8fFd7mZ8Z9IQ7JwZ8iO0pU9PYTEAjrVSDmtlj0OFf0SjV6famoMARXbeUhli212GyVkI7BMUmOGLgYDCrUeODhx0p9T26PThgwv2MSDUGN8/zC7fKc9PfjpCIIrbs1f38grAaP7UCQKm+KWOXTWBA/5uFL87SXJythzF8je8FalG86Xh6smXOnje9Pv8ZIT09gT/kqp9b982R567D/31qMgcunjboO/DB47LFk6R44n9hlLoi43MXx46UvzFnCJevK4XLF67abbAaQyApJTystNWEzhwDKx4nFNzXiyBIlej1FEQTOxzvS/3WfbglPt7j32GS0Wyf1zWCyLY9Lry5Kli+FGjK2I9WW7bdb5e8Fk4bYIEjRUXHif87GMhZgqWq1DSgjKhEi58QLCUhWewsE5iqgkcXR0nba76ZidNo1x5q3i+qLwsRyE08AIFBoQbOUVsRCpPnTtDzJs6Xuyzf7AvTxRt1mW2iLEtY+R4QXei0AkK1L+njhwrsOelFAgxznBU/Ke5k+SsIyyw8I5LNYHD7lgwWPEyt8xjKw4A5VZoU/IIGs5DPgryDkwU9zvtMUzuot/xh2nigzvcjTH0A1+nxb+fJoEEWoIDItAPiKI/9VrmIQePlBuX79w2VyBQtLefOO2YMmKsnD3CRkUJEJQFrXNnCDJpvNh1r+F98njzh3VfTeDgqbafqH7XjHUswEZ5WeZJ485ywSdXvrAG1U85iPAFIylsuD144UxpLKUG46M750qNwTNnTRTQHoSmoJ8ydZreZUa5tMAM8Y2bT5T6Gkf8cpTYeY/h4thR48RVv53a5ygeY/XKDSdKABl19OiKj1E1gQOOgRSvOpb5s1yyFMtnMI1HwzkjG/kdDdLgcpktjHwwrMMmKnbesYuPr50aHCgDQZPw/MRkMWboaIHpcRh16jL6As3gXYZJS1fQHZuYL103OzMGODL952UnSOU/aHZi9lhN+lUVOJhxvOJNZ9n8HYPIXEXzcqttUho4VodpSlxNRshVN6bJ08eME5cvmCr1CMC8asBw7AtVZLyDejy+jlBSy1WOftYXIEAPHIECqBdMmyDtkXAaBq1QRV/M+qBWfuasSTJd3CymqwkcNjNPV3TKjmZfUSAotTJMj1TDVyUTA0vNny993AUMikgACJj+3/XH6eLVG3u/iIoeOL257/yZ8ss4Z+J4AWWjQpt7ce9zkPZhObj73iOkTg3A9aJ5U8TS82b0OfFQdFNXLEmgGRr3faZqAgdn5ApFr2qY9OeT36LPvUpgCJdQNIPPBEGYtFp5ASZgdGzY/fHESdL8Ggpp3q8nBhmAgqjpHX+aIa5YOFXqnMwcO04eEcJOYtDO1Z16l0O/rXZoFTj6/s0vR8mTDZgEABzoOTPkkgNLPMXguGLG9szVs+RGNNwmwCT+wANHSDDBeyjuldOOauSpJnDYlNwHesERsk/Rik8yZZ0XpuZaNRggqjrxxYTjF2zcQaCuPWWqeOiimeLVG0/ssxHrFSycDOD48f4LjhM3n36stJmAy398rQEyWNuPOHq0OPLw0eLQg0dIBzbYTIQGLTZwvdabfvoF9X1YIgO0cFqB2QEUo6A4NfLoMXKZBs1KRHqHItYtZ0yTm8b/vvIEadPhbbu6h5MbgAPAA8aIyD/6mNEC4Ag9C2+7cEyq/FzAkLHU9nvLqvR9NYEDlumS3iE406o4onBq3J9u/JKwKq/04FerPggshP2nB4yQM47jxowTpx03UQoafGcCYGABmj1rUcJZ6Ar7CxwvY3MRRmE4ocBv/L916xw588HGL3RZCpWT/Q5tQRlQ08bmMXxiYIYFM3dsGP/ikJESfPwKP9Ld1O46x0F5WNZUazzKqbdawCFo+9fhQR3jw6lxfViyV7FyNHBsvOHnlwE1cLTI2YUGjtLFtfaBwyLnSdRj5N3Su587h1/Ba6R08IoGXQZouGIvBZutMOCDZiUsRbEBO//Y8XLPBJqS2GPAbAD7BVCxxxLjwrYp8ij5XGOyOHvOJHlSAU9r2OSFVi08hUNxCibm2KsZdtRo6XUN9j84esZeRpg0B3AqL15Ylvm1SA2zDUHLqtaMw2udXjPev7zibjMyTk1nwwptF3Qwdf7yZ0GVpJ0yXINuTNyOWf3SoVrAkQnBCtWAMqPde+W44vdQPFHAEZbaq99B0+lqAyByjdOFbZPl3gqUuTCbypWmFp5VCzgQyCwjd1Zin4oLftAKofilTlZsSi4KWh7y1wLD6DaWB1pYnly6wHUyjGPpWgYN8EC1gKP3KNZYhzi1Ychd6TgN2AAAEJRJREFUxcuwGVki9zmo8XIYlWuhLE8o4043nKBgzwW8AlcHtQ4a1QKO9MdaejfnlDwXhsxVpQwEg8lMm5afvHXQRsRdAHT7Sgc26LPACQ/45LFLjxcIEF0PdKzGjMNZYg5R8saZeW1Qeata/i5Kdu3tCJkStCH1wFC6D73gsvl2LQIuDMAjcAhcL6CBMa4GcHiCoQmbmbODylvV8gsh/kdFoO+k5K6gDdFC1yt0tU4LHLEqX6HwRl/J2K6VoF1VgIOZ13o+1PsHlbeq5ucWuQ6d4YysEivavxmkMZUYcF1H9OCEPQy4+wNfQPW8FvU0ivFJpYFDfqQZeT8ta12IWB9E1qqeV0V2k0homaODNKjYYOn30Qt9UBrDT4byOg/bllpTJffb/0oDR3eybXcpYzLso8GCyFks8uJISAXA7aTk7iCN8jtoOl08AQSGbDDiA4PDAhhHsPU6VpUGDhiT9gKHOSeInMUmL6fkDnQKy5XP7p3/nXIbVq9M1gj9gmk9nBuBD86eW378k1qhVaWBw2bkYQUcNeX1qxAY2MwYpToVZLe3VphGt7PvTGLCsLECLgHgb2PuxPF1O8vwjnslgQMmHZyS9emPc2i2YYVkuiLvxIr2/+PU+DTdsRfKrdQ7MPq+r3DGlR5wB4Bxh6s/xKyJazvDblclgYMzkvB8mC8uV75imc+h5ALVOQSmLqeRYQ+uLi868IFTHjgbwpjD5wfCSjQSvSsKHJbxjJKtsKMnliOnoeZxWGIn1TmbklvLKbyRGK+W+7r9j4dlAlw9tegEscue9aENWsqYVAo4ujoSuyi5chh5C8ey5chWrPPYlDyGTnJqrEO0qVIbW8rA6bTRzSYK0RY+QdTJCaLh1ZM2aKF+Z7+rFHBwZp6rgINT80+lylRNpHdSZGSmk2zuNaU2Ontw9O/qgEM+uk8eMVZGWMMYI8ZMFKEV89Udt+eVAA4oVHJqfK5kqjtFditVpmoivWu9Z7yCjnJG1pYaOiFuzKHb4wIXbE7gWQzjitOT6aPHNtR+Ri4+qARw2JScqEDDpuTxmgCBchvJGZmiOssZWVRKObkGSD+r7qwDmqB/TwfshgNkeFfXYxK9kZsQt/8vZ+R1JUu2lRhTiizVXFro0NuUrESHsdeBzR2/ndAMWV2QyKZ/yxGjpVd0jCWi1u2wW+NtgmbTRP2OesbhUHOYAg3OyLs1b5viBwQ6mTlddbozSR70kwdp1KDoa3UBBI53EDBJjeGfyeTYR1arNM9ECRxphz1PK/qHGbvIryxWJZ2cZnnOnqFZ6qchlR58Xd/GAAWP6vA8DqaFCjkCSmk6bUynKIHDpmRCBjQY6ebU3MyP/NRFGoeRn6vOI/LUxx3zvlWsY5pBN2bQStIEoRHeW+zam8BbF6LEVbL+WqorKuCAFrZa6kv5YYkzi8lN3b2Hc58MePg4nq0lxqmntsLJjnLvh/G6IDFZbF5jkdUqPR5RAQdnifkZmaHmJ0GMRmsWUFYtXbANp8RRhHCY2VKoM5UefF1fi/j1YaPFKze4pvA4NRn661F6ljGo+MwvCuCQxmxJ0qnkhVNCCslLXb/rpIlpvYQwP+my2rbI12EtyMUZNiwabT2kNaObgfGBb1AEnw6r/HovJwrgsKmZVLKC5YpIzf5qPllpiOd20rAUQXjSWCFWtH8pV8ebBrZ8Uu8MF4f+IYQkglpjTD64Y644Ydw4DRg+ZhnesWsaOGx4Lh4u95k3MiLGxbFIa7ll1U2+7mVzt1Rm9xJALPPSXJ3bdHDrHd7B0ffhzkCad2kVN7a7Fq0Yh6XnzZBxaTWdS6fzZtsP3z4XD5fzDLNwr3zAMVY55dRlnu6U+SvljEQiKjOOz+7o5oOO3rlfc8tqzcilM3Ixmk0dOVa8eYt7YoJj1uPG6FlGMZrle9+vuaUjm3fL/Q2dDZsaKflBdU01Piu0nC+3nprO12fHmJG1AJPsDvUfNKylX3PLF/kGTT8vDVQO+NlIgfAEijHvPmu61gAtcVni5bmm5taXv/WjCf2z+bbc3zYjZ6ixwZVbbZPKLauu8zmM3KwIBR+lXcw4NLvDAwa37vad5tYXvQOm70sDDGx0Xr5gqnTnB3q/euNsMb51jN7LCAAamw5sXfLtHYc3ZfNrub+7GTmKM7JByUMYsYnKbUvs88EruvLbAYLBQ7pDEwdlN3zIkOFf6T+4ZWFTc4ujQcM/aMDUnUwaL965ba6cZXy2xBDnzJ0kvr9D7UaGr/b492tuebvfoJZQjcy4tXA7zoiMAws54NR4+dNU+7ez5UD/9lDg8xXtmzqM/FshLWekq2spOcSTJHO72fajvtfU3HJLtZmnFuofcfRo8eSiWZllyfK/HCf23k9rf5Y7dthv6zd46B8332X8NzIMGcKN1NfwWL6C/+vGc3kI9ClYBL9vYX9OybMZ8KBkDWJj5ss0YOCwAzYd1Pp0uUxQz/kQmsC7j/Gf62YLeB6v5z5H3bem5ha2+bZjBuXjx3KfO6mFAzg1XlR8jyscYJVbXkPmc5YnvssZecFLRJ40fp/Pr+Lw4cP/t3/zsNlNg1o/i5pxaqF8aH3ed37vxieWJydNH6/VxQPsYzQNGvpSU/PQw6MQSKiP25Q86eV3J2mcGkVddV8mli2ckge8xEREOHtZe95NqO9tN3qzpsEtV246qHV9LQh42G08/BcjxT3nuxasoBtCE5w9Z1LdBXYOm26FymtqbuH9Bw2bv8ce0cRkxQzbThr/8PI5t8h5dS/gUXYQTkpU8GpFWM7IO04qcXChejdrPmaPpubWxwoxRL28g4+M0ceM7rMkwcbnJfOniO131ariAcZ5Q/9BrTcMGDI8rylEIR708w4uNLH5qXgbV07JlX7y6jQ+KOBY5m+9SmK45xY5G6bG+bJjWbPpoGGTN20e9kEA5ontfgBOQ8zJ48Xz1/ZuesLv56ULpjZkWIIwx7hfc8sTTYOH7pePt8J43m0Ze3JKPvSCBlQSoPgVRvm6jDQF+LK2AxA/IovQb9nUHJtv7wNZmwaP/XZT89Dz+zW3rA2TuapV1u57jxDnGpMzx6qgB+xKziOT9QwjwB4GxrNfc8tHm207bEZ7e7TC28nIcJyY9OFlSi7QoBER3KX3PW73ElzeU/J4sUhWWwwePqSpeeh91RL4IPVutUOr9CCuPHCp/sPc/fTjJ4qBO2ldjCD0xUel3+CWC7f58aRNI2JdWaxYnvgGHHWr8cMVil6cGWaU9eqy0xTotBIj+nh6ThpSRwFGQFCgKUQoWC82Nbe8FYTRKpG3qblF/PLQkeKKk6aK9xe7SluK4R66aKZALJPvaqc6gZeS/ZpbH+jXPHSnQjwTxju5NGFuiBA1jpyR1eDlMMrXZfikgHih/StAas7IZ2ogFILb1LwX3qDzeYD+3h7Tv95v26FnfmdQ66pKgIDfOgYMbhFHHT5K7lO8fpPrREf1DcuRq0+Z2nCxWP3SrtR0+HgMGNwaudBKP7tJcwGnZI0aS8mn1HixbgMp+ZThqibD8Sxn5p85Nb7wDowcHEY+4NT842q2IKfCDhR5+g9qTZbKdGGmR2gBzB4ACitvc61Uvf249y/HyWWKVg33r15faHzwsWgaOOx3399v+NeiZtwuyzicM/K8dzzlPSUXwcQi6vp1+T4oAHDA0S2npCd7oKTBECWP2Mw83bHMn2G24i0Sij2wbizEcGG9U0BxxcKp4tmre09EvG3GUuS3MyaIXfcaHngqHla766Kcga1LtvjRqG28Yx/FvQwIzcg93jHFPWfkg+6lbb+Ook5dZkAKQAvPscgMO2n8M3vg1G93R5ss5YwkelLz9oUSjjSeG9S6ICzjOew/7LP/CDG2ZYxonzlR3Hz6sXmB4uO75oq7/jhdzBw7Tmy3q97oDBukYFHdNHDoLwKyVtHsUi+Dkau8qgOK56C8CI3oooXoBNWnAAyEoIXHGflIDWC+qxvEl/zrgzvI3VcunPr8tFFjZewQRC2DzcehB48U8GEB47C99h0hf8PVHkIHQJ/idydMFBe2TRa3nzlNPLXoBPF5h7thm68+uOi78uSpAgZo39teg0XYYIHymppb7U0HtpgHHZTbJWUYHApVgK6l5i9tSmguwIBWqJMyDgyjLl1GhSmATdIemtiPU3MeHL963bHlE+wwnyMmybI/zxB/PHGSGHn0GK1vEVDfwgfIbGga2HrtdweO3jwqVkvbl5yYrfmp+AbPtX/QqKhfpXLxlXCWmEMQklKqtFPyCKfGm9k734oJ/Fw7k4YMJ7DiwuPksgS+LhC9HTMUHK36YHadJgRAaRrc8s/+A4/ZOwrW6ll+8tYOM463O8iyXJvxkk8oWelQ87h8jrejaJcus8oUkICyPPFdHJN1pxJHunslpvHajScuPIdMemT2hPHrjx83VswYO1aCAkzUDzt0pNhx92ECjnI0OFSPBk3NLR8iNEEhLeJS2QtRBrGZ7ljkNK+fmOwPCYKoYybbbbUdgePXUuvR6eucAo1kPFcrIAitT2lSMGj4d8plP7lP0XHS5jBrsFlirsPIjZyR/3jd92WDBX7DBALm7z3U2KrcunW+BqEAmKyejedqBTDQzinDxz359q1zLM7IVQ4jf4GDX5yUYQlqW4kxiEnCGZmCpYNNyYncMtoQ4Z0z81ybklttRh4uZYnqAsncJ+AbBhue2rakQYQ+zG5K47nBw/5SL8ZztQQYP957xNsvXDcr73F7rtlB2c8oWcnZ3GtsZoxqqOjwYQqLLmtjCtSy8VwtgUW6rT2HHDz6/M+S5FYbho2MvMMZWVs2KKRtnJAfZdmM3IOZC8KT8lTbT2BUufGI6yeaAiFSoFaM52oQLNxN58Gtd/QbNPwH2UOG5QICFXUn23bH5iRmBrZljpdLFCgCMnM2gjTL2D3UnGNTMgHpAAwOm7cD8mZrEmfXoX9rCkRKARjPwQ4ibsZzNQsWro+M5/s3Dy3o8S3SQdWFawpUigJxMJ6rZbBA25sGtXzeNKh1TpRan5XiB12PpkBJFKik8VytA0Vv+6Wj6UVbDB4+oCRi68SaAvVEgbCN53oFrHrKVlG1AQ6mNxvUumc9jb/ui6ZAIAq4kedab45K6Gq53O8Manm/f3PrxDC1PgMNls6sKRA3CujIc70zpX7NrWuaBg87d7Ptp3wrbuOk26MpEDsKyMhzA1tnNXLkuabm1mWbbT98+9gNjm6QpkDcKYDIc/2aW69opMhzTQNbXus/eNjRcR8b3T5NgdhToBGM55oGtXT337blt4MHz/5q7AdEN1BToFYogI3B/tu2TKrHyHNNza23NQ0e+/1aGQvdTk2BmqNAPRnP9WtueWazwUO127ya40Ld4JqlQC0bz2HTt//A1lnYBK7ZAdAN1xSoZQo0DWwZVguR51w9ktb1/Qa2XP6tH03oX8s0123XFKgLCtSC8Vy/5taHBwxu3a0uCK47oSlQTxSA8Vy/5paOWGmJNg97t9/A1nH1RGfdF02BuqRAHIzn+jW3fNFvcMtZA4YM/2ZdEll3SlOgHingGs8Nmx9W5LlSZjFNza3WgEFjtq1Huuo+aQo0BAUqaTzXr7nl1X6Dhh3REITVndQUaAQKwHgOehOlzBz8psWspv+g1gWY5TQCLXUfNQUaigJp47kTwjSe6z+45ab+2w3XcUMahJP+P6Z+3NBYjuF5AAAAAElFTkSuQmCC',
      root: true,
      label: {
        fontSize: 20,
        padding: [2, 15],
        borderRadius: 7,
      },
    });

    const option: any = {
      textStyle: {
        fontFamily: 'NotoSansSC',
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'elasticOut',
      grid: {
        top: '0%',
        bottom: '0%',
      },
      tooltip: {
        show: true,
        formatter(a: any) {
          return a.dataType === 'node' ? (a.data.root ? (a.data.type === '0' ? 'Primary' : a.data.name) : `${a.data.name}`) : a.data.status === false ? 'Error' : 'Normal';
        },
        trigger: 'item',
        padding: 10,
      },
      series: [
        {
          legend: [
            {
              data: categories.map((a: any) => {
                return a.name;
              }),
            },
          ],
          type: 'graph',
          layout: 'none',
          symbolSize: 70,
          legendHoverLink: true,
          edgeSymbol: ['none', 'none'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20,
          },
          data: graphData,
          itemStyle: {
            borderColor: 'var(--my-white)',
            borderWidth: 1,
            shadowBlur: 50,
            shadowOffsetY: 20,
            shadowColor: colors[3],
          },
          label: {
            fontSize: 15,
            show: true,
            position: 'top',
            center: 'left',
            distance: 10,
            align: 'center',
            padding: [2, 10],
            borderRadius: 5,
            color: colors[8],
            fontFamily: 'NotoSansSC',
            backgroundColor: colors[9],
          },
          emphasis: {
            lineStyle: {
              width: 10,
            },
          },
          links: linksData,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: colors[4],
                },
                {
                  offset: 1,
                  color: colors[5],
                },
              ],
            },
            curveness: 0,
            width: 10,
            symbolSize: [10, 20],
          },
        },
      ],
    };
    this.option = option;
  }
  @Watch('link', { immediate: true })
  onchange(newVal: any) {
    this.initData();
    this.$nextTick(() => {
      this.initChart();
    });
  }
  private initChart() {
    this.chart && this.chart.dispose();
    this.chart = echarts.init(this.$el as any, 'macarons');
    this.chart.setOption(this.option);
  }
}
</script>

<style lang="scss" scoped>
.chart {
  margin: -4em auto 0;
  transform: scale(0.8);
}
</style>

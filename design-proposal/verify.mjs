import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const browser = await chromium.launch({headless:true,executablePath:'/Users/naduseong/Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell'});
const base = 'http://127.0.0.1:4322/design-proposal/';
const errors = [], checks = [];
try {
  for (const width of [320,390,768,1440]) {
    const page = await browser.newPage({viewport:{width,height:width===390?1000:1000},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'index.html'); await page.evaluate(()=>document.fonts.ready);
    await page.waitForSelector('.history-item');
    await page.evaluate(async()=>{const images=[...document.images];images.forEach(im=>im.loading='eager');await Promise.all(images.map(im=>im.decode()));});
    console.log(`${width}px 화면 검증 중`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
    assert.equal(await page.locator('img').evaluateAll(images=>images.every(im=>im.complete&&im.naturalWidth>0)),true);
    assert.equal(await page.locator('[data-course]:visible').count(),3);
    await page.locator('[data-audience="org"]').click();
    assert.equal(await page.locator('[data-course]:visible').count(),1);
    assert.equal(await page.locator('[data-course="org"]').isVisible(),true);
    await page.locator('[data-audience="all"]').click();
    await page.locator('[data-step="2"]').click();
    assert.match(await page.locator('#artifact-name').textContent(),/동료 리뷰/);
    await page.locator('[data-step="4"]').click();
    assert.match(await page.locator('#artifact-name').textContent(),/회고/);
    await page.locator('[data-step="0"]').click();
    await page.selectOption('#year-filter','2025');
    await page.selectOption('#type-filter','대학·창업');
    assert.equal(await page.locator('.history-item').count(),1);
    await page.locator('.history-item summary').click();
    assert.equal(await page.locator('.history-item[open]').count(),1);
    assert.match(await page.locator('.history-detail').textContent(),/확인 필요/);
    await page.selectOption('#year-filter','2027');
    assert.equal(await page.locator('.empty-state').isVisible(),true);
    await page.locator('#reset-filter').click();
    assert.equal(await page.locator('.history-item').count(),4);
    await page.locator('#more-history').click();
    assert.equal(await page.locator('.history-item').count(),46);
    await page.locator('#reset-filter').click();
    await page.locator('[data-sample="after"]').click();
    assert.match(await page.locator('#sample-output').textContent(),/추가 확인/);
    await page.locator('[data-sample="before"]').click();
    await page.locator('[data-org="대학·기관"]').click();
    assert.match(decodeURIComponent(await page.locator('#contact-email').getAttribute('href')),/대학·기관 교육 문의/);
    await page.locator('[data-org="기업"]').click();
    if(width<=768){
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('#main-nav').isVisible(),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      assert.equal(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),true);
    }
    await page.locator('[data-step="1"]').focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('[data-step="1"]').getAttribute('aria-pressed'),'true');
    await page.locator('[data-step="0"]').click();
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.button').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0)});
    if(width===1440||width===390){
      const name=width===1440?'desktop':'mobile';
      await page.screenshot({path:`public/design-proposal/${name}.png`});
      await page.screenshot({path:`public/design-proposal/${name}-full.png`,fullPage:true});
      if(width===1440){
        await page.locator('[data-step="2"]').click();
        await page.locator('#method').screenshot({path:'public/design-proposal/interaction.png'});
      }
    }
    checks.push(`${width}px: 가로 넘침 없음, 이미지 표시, 대상 선택, 학습 단계, 이력 복합 필터·빈 결과·초기화·펼침, AI 전후 비교, 문의 대상, 키보드, 동작 줄이기 — 통과`);
    await page.goto(base+'proposal.html');await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('h2').count(),9);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`report overflow ${width}`);
    await page.close();
  }
  const noJS = await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await noJS.goto(base+'index.html');
  assert.equal(await noJS.locator('h1').isVisible(),true);
  assert.equal(await noJS.locator('a[href="proposal.html#history"]').isVisible(),true);
  checks.push('자바스크립트 비활성: 회사 정체성·핵심 행동·전체 이력 문서 링크 표시 — 통과');
  await noJS.close();
  assert.deepEqual(errors,[]);
  const text = ['검증 일자: 2026-09-17','로컬 디자인 시안 검증','',...checks,'','자바스크립트 실행 오류: 0건','외부 링크의 신청과 문의 메일 발송은 실행하지 않았습니다.','스크린리더 실기 사용성 및 운영 데이터 연동은 이번 검증 범위에 포함하지 않았습니다.'].join('\n');
  writeFileSync('design-proposal/verification.txt',text);
  writeFileSync('public/design-proposal/verification.html',`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>시안 검증 기록</title><body style="font:16px/1.8 sans-serif;max-width:900px;margin:40px auto;padding:20px"><a href="proposal.html">제안서로 돌아가기</a><h1>시안 검증 기록</h1><pre style="white-space:pre-wrap">${text}</pre></body></html>`);
  console.log(text);
} finally { await browser.close(); }

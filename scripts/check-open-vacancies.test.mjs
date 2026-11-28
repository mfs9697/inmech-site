import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activeVacancyAnnouncements, vacancyArchive } from '../src/data/vacancies.ts';
import { activeVacancyAnnouncementsEn } from '../src/data/vacanciesEn.ts';
import { countOpenVacancies, openVacancyLabel, vacancyWindows } from '../src/utils/openVacancies.ts';

const publicationDate = '2026-11-28';
const deadlineDate = '2026-12-28';
const during = new Date('2026-12-01T12:00:00Z');
const staff = (positions) => ({ id: 'research-staff', deadlineDate, positions });
const announcement = (...tracks) => ({ publicationDate, tracks });
const open = (active, now = during) => countOpenVacancies(vacancyWindows(active), now);

test('zero open positions with an empty active collection', () => {
  assert.equal(open([]), 0);
  assert.equal(openVacancyLabel(0, 'uk'), '');
  assert.equal(openVacancyLabel(0, 'en'), '');
});

test('a half-FTE opening counts as one position', () => {
  assert.equal(open([announcement(staff([{ fte: 0.5 }]))]), 1);
});

test('four positions count individually even though they total 3.5 FTE', () => {
  assert.equal(open([announcement(staff([{ fte: 1 }, { fte: 1 }, { fte: 1 }, { fte: 0.5 }]))]), 4);
  for (const active of [activeVacancyAnnouncements, activeVacancyAnnouncementsEn]) {
    const order = active.find(({ orderNumber }) => orderNumber === '141/к');
    if (!order) continue; // The order can later be transferred to the archive.
    assert.equal(order.positions.reduce((sum, role) => sum + role.fte, 0), 3.5);
    assert.equal(open([order], new Date(order.publicationDate + 'T12:00:00Z')), 4);
    const expected = new Date(order.publicationDate + 'T00:00:00Z');
    expected.setUTCDate(expected.getUTCDate() + 30);
    assert.equal(order.tracks[0].deadlineDate, expected.toISOString().slice(0, 10));
  }
});

test('simultaneous competitions count live staff tracks and grouped identical openings once', () => {
  const expired = { ...staff([{ count: 9 }]), deadlineDate: '2026-11-29' };
  const postdoc = { ...staff([{ count: 4 }]), id: 'postdoc' };
  assert.equal(open([announcement(staff([{ count: 2 }]), expired, postdoc), announcement(staff([{}]))]), 3);
});

test('archived competitions are excluded even while their original dates would be open', () => {
  const archived = vacancyArchive.find(({ orderNumber }) => orderNumber === '118/к');
  assert.ok(archived.positions.length > 0);
  assert.equal(open([archived], new Date('2026-11-01T12:00:00Z')), 0);
});

test('publication day and inclusive deadline are evaluated at Kyiv midnight', () => {
  const active = [announcement(staff([{}]))];
  assert.equal(open(active, new Date('2026-11-27T21:59:59Z')), 0);
  assert.equal(open(active, new Date('2026-11-27T22:00:00Z')), 1);
  assert.equal(open(active, new Date('2026-12-28T21:59:59Z')), 1);
  assert.equal(open(active, new Date('2026-12-28T22:00:00Z')), 0);
});

test('Ukrainian and English grammatical forms', () => {
  for (const [count, form] of [
    [1, 'відкрита посада'], [2, 'відкриті посади'], [3, 'відкриті посади'], [4, 'відкриті посади'],
    [5, 'відкритих посад'], [11, 'відкритих посад'], [12, 'відкритих посад'],
    [13, 'відкритих посад'], [14, 'відкритих посад'], [21, 'відкрита посада'],
    [22, 'відкриті посади'], [114, 'відкритих посад'], [104, 'відкриті посади']
  ]) {
    assert.equal(openVacancyLabel(count, 'uk'), `${count} ${form}`);
    assert.equal(openVacancyLabel(count, 'en'), `${count} open position${count === 1 ? '' : 's'}`);
  }
});

export type DefendedDissertationTopic = {
  id: string;
  en: string;
  uk: string;
  terms: string[];
};

export const defendedDissertationTopics = [
  { id: 'stability', en: 'Stability', uk: 'Стійкість', terms: ['stability', 'стійк', 'устойчив'] },
  { id: 'vibrations', en: 'Vibrations', uk: 'Коливання', terms: ['vibration', 'oscillation', 'колив', 'колебан'] },
  { id: 'shells', en: 'Shells', uk: 'Оболонки', terms: ['shell', 'оболон', 'оболоч'] },
  { id: 'plates', en: 'Plates', uk: 'Пластини', terms: ['plate', 'пластин'] },
  { id: 'cylindrical-shells', en: 'Cylindrical shells', uk: 'Циліндричні оболонки', terms: ['cylindrical shell', 'cylindrical shells', 'цилиндрическ', 'циліндричн'] },
  { id: 'conical-shells', en: 'Conical shells', uk: 'Конічні оболонки', terms: ['conical shell', 'conical shells', 'коническ', 'конічн'] },
  { id: 'spherical-shells', en: 'Spherical shells', uk: 'Сферичні оболонки', terms: ['spherical shell', 'spherical shells', 'сферическ', 'сферичн'] },
  { id: 'composite-materials', en: 'Composite materials', uk: 'Композитні матеріали', terms: ['composite', 'composites', 'композит', 'композицион'] },
  { id: 'layered-structures', en: 'Layered structures', uk: 'Шаруваті структури', terms: ['layered', 'laminated', 'multilayer', 'шаруват', 'слоист', 'многослой', 'багатошар'] },
  { id: 'orthotropic-materials', en: 'Orthotropic materials', uk: 'Ортотропні матеріали', terms: ['orthotropic', 'ортотроп'] },
  { id: 'anisotropic-materials', en: 'Anisotropic materials', uk: 'Анізотропні матеріали', terms: ['anisotropic', 'анизотроп', 'анізотроп'] },
  { id: 'viscoelasticity', en: 'Viscoelasticity', uk: 'В’язкопружність', terms: ['viscoelastic', 'вязкоупруг', 'в’язкопруж', 'вязкопруж'] },
  { id: 'elastoplasticity', en: 'Elastoplasticity', uk: 'Пружнопластичність', terms: ['elastoplastic', 'elastic-plastic', 'упруго-пласт', 'пружнопласт'] },
  { id: 'thermoelasticity', en: 'Thermoelasticity', uk: 'Термопружність', terms: ['thermoelastic', 'термоупруг', 'термопруж'] },
  { id: 'thermomechanics', en: 'Thermomechanics', uk: 'Термомеханіка', terms: ['thermomechanics', 'thermomechanical', 'термомехан'] },
  { id: 'fracture-mechanics', en: 'Fracture mechanics', uk: 'Механіка руйнування', terms: ['fracture', 'crack growth', 'разрушен', 'руйнуван'] },
  { id: 'cracks', en: 'Cracks', uk: 'Тріщини', terms: ['crack', 'cracks', 'трещин', 'тріщин'] },
  { id: 'contact-problems', en: 'Contact problems', uk: 'Контактні задачі', terms: ['contact', 'контакт'] },
  { id: 'wave-propagation', en: 'Wave propagation', uk: 'Поширення хвиль', terms: ['wave propagation', 'wave processes', 'распространение волн', 'поширення хвиль'] },
  { id: 'elastic-waves', en: 'Elastic waves', uk: 'Пружні хвилі', terms: ['elastic waves', 'упругие волны', 'пружні хвилі'] },
  { id: 'nonstationary-processes', en: 'Nonstationary processes', uk: 'Нестаціонарні процеси', terms: ['nonstationary', 'non-stationary', 'нестационар', 'нестаціонар'] },
  { id: 'stress-strain-state', en: 'Stress-strain state', uk: 'Напружено-деформований стан', terms: ['stress-strain', 'stress state', 'deformed state', 'напряженно-деформ', 'напружено-деформ', 'напряженное состояние', 'напружений стан'] },
  { id: 'stress-concentration', en: 'Stress concentration', uk: 'Концентрація напружень', terms: ['stress concentration', 'концентрац'] },
  { id: 'dynamics', en: 'Dynamics', uk: 'Динаміка', terms: ['dynamics', 'dynamic', 'динамик', 'динамік'] },
  { id: 'nonlinear-mechanics', en: 'Nonlinear mechanics', uk: 'Нелінійна механіка', terms: ['nonlinear', 'нелинейн', 'нелінійн'] },
  { id: 'numerical-methods', en: 'Numerical methods', uk: 'Чисельні методи', terms: ['numerical', 'finite element', 'численн', 'чисельн'] },
  { id: 'structural-mechanics', en: 'Structural mechanics', uk: 'Будівельна механіка', terms: ['structural mechanics', 'structural elements', 'строительн', 'будівельн'] },
  { id: 'rigid-body-dynamics', en: 'Rigid body dynamics', uk: 'Динаміка твердого тіла', terms: ['rigid body', 'твердого тела', 'твердого тіла'] },
  { id: 'theoretical-mechanics', en: 'Theoretical mechanics', uk: 'Теоретична механіка', terms: ['theoretical mechanics', 'теоретическ', 'теоретичн'] },
  { id: 'fluid-structure-interaction', en: 'Fluid-structure interaction', uk: 'Взаємодія з рідиною', terms: ['fluid-structure', 'fluid', 'liquid', 'жидкост', 'рідиною', 'рідин'] },
  { id: 'porous-media', en: 'Porous media', uk: 'Пористі середовища', terms: ['porous', 'порист'] },
  { id: 'piezoelectricity', en: 'Piezoelectricity', uk: 'П’єзоелектрика', terms: ['piezo', 'пьезо', 'п’єзо'] },
  { id: 'electroelasticity', en: 'Electroelasticity', uk: 'Електропружність', terms: ['electroelastic', 'electromechanics', 'электроупруг', 'електропруж'] },
  { id: 'magnetoelasticity', en: 'Magnetoelasticity', uk: 'Магнітопружність', terms: ['magnetoelastic', 'magnetomechanics', 'магнито', 'магніто'] },
  { id: 'creep', en: 'Creep', uk: 'Повзучість', terms: ['creep', 'ползуч', 'повзуч'] },
  { id: 'fatigue', en: 'Fatigue', uk: 'Втома', terms: ['fatigue', 'усталост', 'втом'] },
  { id: 'wear', en: 'Wear', uk: 'Зношування', terms: ['wear', 'friction', 'износ', 'знош', 'тертя', 'трени'] },
  { id: 'strength', en: 'Strength', uk: 'Міцність', terms: ['strength', 'durability', 'міцн', 'прочн', 'долговеч', 'довговіч'] },
  { id: 'experimental-mechanics', en: 'Experimental mechanics', uk: 'Експериментальна механіка', terms: ['experimental', 'testing', 'експеримент', 'эксперимент', 'испытан', 'випроб'] },
  { id: 'optimization', en: 'Optimization', uk: 'Оптимізація', terms: ['optimization', 'optimal', 'оптим'] }
] satisfies DefendedDissertationTopic[];

export const defendedDissertationTopicLimit = 40;

export function matchDefendedDissertationTopics(text: string) {
  const haystack = text.toLocaleLowerCase();

  return defendedDissertationTopics
    .filter((topic) => topic.terms.some((term) => haystack.includes(term.toLocaleLowerCase())))
    .map((topic) => topic.id);
}

module.exports = {
  name: "Wait MOD",
  section: "Other Stuff",
  subtitle(data, presets) {
    const measurements = ["Millisegundos", "Segundos", "Minutos", "Horas"];
    return `${data.time} ${measurements[parseInt(data.measurement, 10)]}`;
  },
  meta: { version: "2.1.7", preciseCheck: true, author: 'Aklads', authorUrl: 'https://github.com/Aklads', downloadUrl: 'https://github.com/Aklads/DBM_mods', modAuthors: ['Aklads'] },

  fields: ["time", "measurement"],

  html(isEvent, data) {
    return `
<div style="float: left; width: 60%; padding-top: 8px;">
  <p><u>Nota:</u> Este aguarda algum tempo antes de executar próxima ação.</p>
</div><br><br><br>

<div>
	<div style="float: left; width: 45%;">
		<span class="dbminputlabel">Tempo em</span><br>
		<select id="measurement" class="round">
			<option value="0">Millisegundos</option>
			<option value="1" selected>Segundos</option>
			<option value="2">Minutos</option>
			<option value="3">Horas</option>
		</select>
	</div>
	<div style="float: right; width: 50%;">
		<span class="dbminputlabel">Quantidade</span><br>
		<input id="time" class="round" type="text">
	</div>
</div>`;
  },
  init() { },

  action(cache) {
    const data = cache.actions[cache.index];
    let time = parseInt(this.evalMessage(data.time, cache), 10);
    const type = parseInt(data.measurement, 10);
    switch (type) {
      case 1:
        time *= 1e3;
        break;
      case 2:
        time *= 1e3 * 60;
        break;
      case 3:
        time *= 1e3 * 60 * 60;
        break;
      default:
        return this.callNextAction(cache);
    }
    setTimeout(() => this.callNextAction(cache), time).unref();
  },
  mod() { },
};

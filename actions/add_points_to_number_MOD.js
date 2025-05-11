module.exports = {
  name: 'Add pontos a número MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: false,
    author: 'Aklads',
    authorUrl: 'https://github.com/Aklads/DBM_mods',
    modAuthors: ['Aklads'],
  },

  subtitle(data) {
    if (data.descriptionx == true) {
        desccor = data.descriptioncolor;
    } else {
        desccor = "#fff";
    }

    return data.description
        ? `<font color="${desccor}">${data.description}</font>`
        : `<font color="${desccor}">${data.number} | ${data.varName}</font>`;
},

  fields: ["descriptioncolor", "description", "descriptionx",'number', 'storage', 'varName'],

  html() {
    return `


    <div id="flutuador" style="padding: 0px 0px 15px 0px; margin-top: 10px;">
        <table style="width:100%;">
            <tr>
                <td>
                    <span class="dbminputlabel">Descrição da Action</span>
                    <br>
                    <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
                </td>
                <td style="padding: 0px 0px 0px 10px; width: 70px;">
                    <div style="float: left; padding: 0px 0px 0px 7px; margin-top: -5px">
                        <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
                    </div>
                    <br>
                    <input type="color" value="#ffffff" class="round" id="descriptioncolor">
                </td>
            </tr>
        </table>
    </div>


<div style="float: left; width: 60%; padding-top: 8px;">
  <p><u>Nota:</u><br>
  Este mod adiciona pontos a um número para cada 1000.</p>
</div>
<br><br><br>

<div style="float: left; width: 70%; padding-top: 8px;">
  <span class="dbminputlabel">Número para adicionar pontos</span>
  <input id="number" class="round" type="text" placeholder="1000000">
</div>
<br><br><br><br>

<div>
  <store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>
<br><br><br>

<div style="text-align: center; float: left; width: 100%; padding-top: 8px;">
  <p><b>Example:</b> 1000000 será convertido para 1.000.000</p>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const number = this.evalMessage(data.number, cache);

    // Use regex para adicionar vírgulas ao número
    const numberWithCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(numberWithCommas, storage, varName, cache);

    this.callNextAction(cache);
  },
};

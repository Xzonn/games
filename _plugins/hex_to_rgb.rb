# Reference: https://github.com/joshsamara/Jekyll-HexToRGB
# License: MIT
# Reference: https://github.com/anilyanduri/color_math
# License: MIT
# See third_party.html for more information

module Jekyll
  module HexToRGB
    def hex_to_rgb(hexval)
      if hexval.start_with?("#") then
        hexval = hexval[1..-1]
      end
      return hexval.scan(/../).map {|color| color.to_i(16)}
    end

    def rgb_to_hex(rgbval)
      return "#" + (rgbval.map {|color| color.to_s(16).rjust(2, "0")}).join("")
    end

    def rgb_to_hsl(rgbval)
      r = rgbval[0] / 255.0
      g = rgbval[1] / 255.0
      b = rgbval[2] / 255.0
      max = [r, g, b].max
      min = [r, g, b].min
      h = s = l = (max + min) / 2.0

      if max == min then
        h = s = 0.0
      else
        d = max - min
        s = (l > 0.5) ? d / (2.0 - max - min) : d / (max + min)
        case max
        when r
          h = (g - b) / d + (g < b ? 6.0 : 0.0)
        when g
          h = (b - r) / d + 2.0
        when b
          h = (r - g) / d + 4.0
        end
        h /= 6.0
      end
      return [h, s, l]
    end

    def hsl_to_rgb(hslval)
      h = hslval[0]
      s = hslval[1]
      l = hslval[2]

      if s == 0.0 then
        r = g = b = l
      else
        q = (l < 0.5) ? l * (1.0 + s) : l + s - l * s
        p = 2.0 * l - q
        r = hue_to_rgb([p, q, h + 1.0 / 3.0])
        g = hue_to_rgb([p, q, h])
        b = hue_to_rgb([p, q, h - 1.0 / 3.0])
      end
      return [(r * 255).to_i(), (g * 255).to_i(), (b * 255).to_i()]
    end

    def hue_to_rgb(hueval)
      p = hueval[0]
      q = hueval[1]
      t = hueval[2]
      if t < 0.0 then
        t += 1.0
      end
      if t > 1.0 then
        t -= 1.0
      end
      if t < 1.0 / 6.0 then
        return p + (q - p) * 6.0 * t
      end
      if t < 1.0 / 2.0 then
        return q
      end
      if t < 2.0 / 3.0 then
        return p + (q - p) * (2.0 / 3.0 - t) * 6.0
      end
      return p
    end

    def lighten_to(hslval, l = 0.5)
      return [hslval[0], hslval[1], l.to_f]
    end

    def hex_lighten_to(hexval, l = 0.5)
      return rgb_to_hex(hsl_to_rgb(lighten_to(rgb_to_hsl(hex_to_rgb(hexval)), l)))
    end
  end
end

Liquid::Template.register_filter(Jekyll::HexToRGB)
